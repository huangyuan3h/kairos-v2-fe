"use client";

import { AgentTrigger } from "./agent-trigger";
import { AgentDialog } from "./agent-dialog";

interface AgentProps {
  className?: string;
}

export function Agent({ className }: AgentProps) {
  return (
    <>
      <AgentTrigger className={className} />
      <AgentDialog />
    </>
  );
}
