import { Button } from "@/components/atoms/button";
import * as React from "react";

interface FormActionsProps {
  onLogout: () => void;
  loggingOut: boolean;
  loading: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onLogout,
  loggingOut,
  loading,
}) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="destructive"
        className="px-6 py-2"
        onClick={onLogout}
        disabled={loggingOut}
      >
        {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
      </Button>
      <Button type="submit" className="px-6 py-2" disabled={loading}>
        {loading ? "Guardando..." : "Guardar cambios"}
      </Button>
    </div>
  );
};
