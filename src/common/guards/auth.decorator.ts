import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { RoleGuard } from "./role.guard";

export function Auth(...roles: string[]) {
    return applyDecorators(
        SetMetadata("roles", roles),
        UseGuards(AuthGuard, RoleGuard),
    )
}