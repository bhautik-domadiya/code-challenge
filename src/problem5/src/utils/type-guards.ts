// utils/type-guards.ts
import { AuthenticatedRequest } from "@utils/types/core";
import { Request } from "express";

export function isAuthenticated(req: Request): req is AuthenticatedRequest {
  return (req as any).user !== undefined;
}
