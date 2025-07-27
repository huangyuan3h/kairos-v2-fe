import { use } from "react";
import { Layout } from "@/components/layout";
import { AgentTrigger } from "@/components/agent/agent-trigger";
import { AgentDialog } from "@/components/agent/agent-dialog";

export default function TestAgent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <Layout locale={locale} title="Test Agent">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Agent</h1>
          <p className="text-gray-600 mt-2">
            This page is for testing the Agent component functionality.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Agent Component Test
          </h2>
          <p className="text-gray-600">
            You should see a floating AI Assistant button in the bottom-right
            corner. Click it or press ⌘K to open the Agent dialog.
          </p>
        </div>
      </div>

      {/* AI Agent Components */}
      <AgentTrigger />
      <AgentDialog />
    </Layout>
  );
}
