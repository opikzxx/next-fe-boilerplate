"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import type { Role } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { ModalConfirmation } from "@/components/shared/modal-confirmation";
import { deleteUser, updateUserRole } from "@/features/users/api";
import { useRouter } from "@/lib/i18n-navigation";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
};

export function UsersTable(props: { users: UserRow[]; currentUserId: string }) {
  const t = useTranslations("AdminUsersPage");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  if (props.users.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-border py-16 text-center">
        <p className="font-semibold">{t("empty_title")}</p>
        <p className="text-sm text-muted-foreground">{t("empty_description")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs font-medium text-muted-foreground">
          <tr>
            <th className="px-4 py-3">{t("column_name")}</th>
            <th className="px-4 py-3">{t("column_email")}</th>
            <th className="px-4 py-3">{t("column_role")}</th>
            <th className="px-4 py-3">{t("column_created")}</th>
            <th className="px-4 py-3">{t("column_actions")}</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => {
            const isSelf = user.id === props.currentUserId;

            return (
              <tr key={user.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    disabled={isSelf || isPending}
                    onChange={(event) =>
                      startTransition(async () => {
                        await updateUserRole(user.id, {
                          role: event.target.value as Role,
                        });
                        router.refresh();
                      })
                    }
                    className="h-9 rounded-lg border border-transparent bg-black/[0.035] px-3 text-sm outline-none disabled:opacity-50 dark:bg-white/5"
                  >
                    <option value="ADMIN">{t("role_admin")}</option>
                    <option value="CREATOR">{t("role_creator")}</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Intl.DateTimeFormat("id-ID", {
                    dateStyle: "medium",
                  }).format(user.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={isSelf}
                    onClick={() => setUserIdToDelete(user.id)}
                  >
                    {t("action_delete")}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalConfirmation
        open={userIdToDelete !== null}
        onOpenChange={(open) => !open && setUserIdToDelete(null)}
        title={t("delete_confirm_title")}
        description={t("delete_confirm_description")}
        confirmLabel={t("action_delete")}
        variant="destructive"
        isLoading={isPending}
        onConfirm={() =>
          startTransition(async () => {
            if (!userIdToDelete) {
              return;
            }
            await deleteUser(userIdToDelete);
            setUserIdToDelete(null);
            router.refresh();
          })
        }
      />
    </div>
  );
}
