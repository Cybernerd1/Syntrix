"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import { MessageContext } from "@/context/MessageContext";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandPackPreviewClient from "./SandPackPreviewClient";
import { ActionContext } from "@/context/ActionContext";
import { useModel } from "@/context/ModelContext";
import { toast } from "sonner";

const TAILWIND_CDN = 'https://cdn.tailwindcss.com';

/**
 * Ensures /public/index.html always contains the Tailwind CDN <script> tag.
 * AI-generated files sometimes ship their own index.html without it.
 */
const ensureTailwindCDN = (files) => {
  const htmlKey = '/public/index.html';
  if (files[htmlKey]?.code) {
    if (!files[htmlKey].code.includes('cdn.tailwindcss.com')) {
      // Inject right before </head>
      files[htmlKey] = {
        ...files[htmlKey],
        code: files[htmlKey].code.replace(
          '</head>',
          `    <script src="${TAILWIND_CDN}"></script>\n  </head>`
        ),
      };
    }
  }
  return files;
};

const CodeView = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  const [activeTab, setActiveTab] = useState('code')
  const { id } = useParams()
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE)
  const { messages, setMessages } = useContext(MessageContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles)
  const convex = useConvex();
  const [loading, setLoading] = useState(false)
  const UpdateTokens = useMutation(api.users.UpdateToken)
  const { action, setAction } = useContext(ActionContext);
  const { selectedModel } = useModel();

  useEffect(() => {
    id && GetFiles()
  }, [id])

  useEffect(() => {
    setActiveTab('preview');
  }, [action])

  const GetFiles = async () => {
    setLoading(true)
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id
    });
    let mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData }
    delete mergedFiles['/postcss.config.js'];
    delete mergedFiles['/tailwind.config.js'];
    
    // Sanitize any existing tailwind directives to prevent Sandpack's PostCSS from crashing
    for (const key in mergedFiles) {
      if (key.endsWith('.css') && mergedFiles[key].code) {
        mergedFiles[key].code = mergedFiles[key].code.replace(/@tailwind\s+(base|components|utilities);/g, '');
        mergedFiles[key].code = mergedFiles[key].code.replace(/@import\s+['"]tailwindcss(\/.*)?['"];?/g, '');
      } else if ((key.endsWith('.js') || key.endsWith('.jsx')) && mergedFiles[key].code) {
        mergedFiles[key].code = mergedFiles[key].code.replace(/import\s+['"]tailwindcss(\/.*)?['"];?/g, '');
      }
    }

    // Ensure Tailwind CDN is always present in index.html
    mergedFiles = ensureTailwindCDN(mergedFiles);
    
    setFiles(mergedFiles)
    setLoading(false)
  }


  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        GenerateAiCode()
      }
    }
  }, [messages])



  const GenerateAiCode = async () => {
    setLoading(true)
    try {
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
      const result = await axios.post('/api/gen-ai-code', {
        prompt: PROMPT,
        modelId: selectedModel.id,
        providerKey: selectedModel.provider_key,
      });
      console.log(result.data);
      const aiResp = result.data;

      // Surface any API-level error
      if (aiResp?.error) {
        toast.error("Code generation error: " + aiResp.error);
        setLoading(false);
        return;
      }

      let mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files }
      delete mergedFiles['/postcss.config.js'];
      delete mergedFiles['/tailwind.config.js'];
      
      // Sanitize AI generated CSS files just to be safe
      for (const key in mergedFiles) {
        if (key.endsWith('.css') && mergedFiles[key].code) {
          mergedFiles[key].code = mergedFiles[key].code.replace(/@tailwind\s+(base|components|utilities);/g, '');
          mergedFiles[key].code = mergedFiles[key].code.replace(/@import\s+['"]tailwindcss(\/.*)?['"];?/g, '');
        }
      }

      // Ensure Tailwind CDN is always present in index.html
      mergedFiles = ensureTailwindCDN(mergedFiles);
      
      setFiles(mergedFiles);

      if (aiResp?.files) {
        await UpdateFiles({
          workspaceId: id,
          files: aiResp.files
        })
      }

      setActiveTab('preview')
      const token =
        Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));

      await UpdateTokens({
        userId: userDetail?._id,
        token: token,
      });
      setUserDetail(prev => ({
        ...prev,
        token: token
      }))
    } catch (error) {
      // Show actual error from server if available, otherwise generic
      const serverMsg = error?.response?.data?.error;
      if (serverMsg) {
        toast.error("Code gen failed: " + serverMsg);
      } else {
        toast.error("Code generation failed. Please restart the dev server if you just updated your API keys.");
      }
      console.error("GenerateAiCode error:", error);
    }


    setLoading(false)
  }




  return (
    <div>
      <div className="bg-[#181818] p-2 w-full border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 px-2 rounded-full justify-center gap-3 w-[140px] "  >
          <h2 className={`text-sm cursor-pointer ${activeTab == 'code' && 'text-blue-500  bg-blue-500/25 p-1 rounded-full'} `} onClick={() => { setActiveTab('code') }}>Code</h2>
          <h2 className={`text-sm cursor-pointer ${activeTab == 'preview' && 'text-blue-500 bg-blue-500/25 p-1 rounded-full'} `} onClick={() => { setActiveTab('preview') }} >Preview</h2>
        </div>
      </div>
      <SandpackProvider
      //  key={JSON.stringify(files)}
       files={files} template="react" theme={"dark"} customSetup={{
        dependencies: {
          ...Lookup.DEPENDANCY
        }
      }}
        options={{
          externalResources: ['https://cdn.tailwindcss.com'],
          // bundlerURL: 'https://sandpack-bundler.codesandbox.io',
        }}   >
        <SandpackLayout>
          {activeTab == 'code' ? (<>

            <SandpackFileExplorer style={{ height: "80vh" }} />
            <SandpackCodeEditor style={{ height: "80vh" }} />

          </>) : (

            <SandPackPreviewClient />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && <div className="p-10 bg-gray-900 opacity-90 absolute top-0 rounded-lg w-full h-full flex items-center justify-center" >
        <Loader2Icon className="animate-spin h-10 w-10 text-white " />
        <h2 className="text-white">Generating your files...</h2>
      </div>}
    </div>
  );
};

export default CodeView;