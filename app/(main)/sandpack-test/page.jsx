"use client";

import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import Lookup from "@/data/Lookup";

export default function SandpackTest() {
  return (
    <div style={{ height: "100vh" }}>
      <SandpackProvider
        template="react"
        files={Lookup.DEFAULT_FILE}
      >
        <SandpackLayout>
          <SandpackPreview
            style={{
              height: "80vh",
              width: "100%",
            }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}