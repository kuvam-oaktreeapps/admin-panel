import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import Layout from "@/layout/layout";
import { XXXXXType } from "@/types/xxxxx";
import { useNavigate } from "react-router-dom";
import { fetcher } from "@/fetcher";
import { ServerResponse } from "@/types/types";
import { Image } from "primereact/image";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Datatable from "@/components/Datatable";

const XXXXX = () => {
  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [selectedEntities, setSelectedEntities] = useState<XXXXXType[]>([]);

  const {
    data: entities,
    refetch: refetchEntities,
    isLoading: isLoadingEntities,
  } = fetcher.useQuery<ServerResponse<XXXXXType[]>>("xxxxx");

  const { mutate: mutateEntities } = fetcher.useMutation<ServerResponse<any>>("/xxxxx/delete", {
    onSuccess: async ({ message }) => {
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: message,
        life: 3000,
      });

      refetchEntities().then();
    },
    onError: async ({ data }) => {
      toast.current?.show({
        severity: "error",
        summary: "Error occured",
        detail: data.message,
        life: 3000,
      });
    },
  });

  const { mutate: mutateEntity } = fetcher.useMutation<ServerResponse<any>>("xxxxx", {
    method: "DELETE",
    onSuccess: async ({ message }) => {
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: message,
        life: 3000,
      });
      refetchEntities().then();
    },
    onError: async ({ data }) => {
      toast.current?.show({
        severity: "error",
        summary: "Error occured",
        detail: data.message,
        life: 3000,
      });
    },
  });

  const confirmDelete = (rowData: XXXXXType) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => mutateEntity(undefined, { pathname: `/xxxxx/${rowData.id}` }),
    });
  };

  const confirmBulkDelete = () => {
    confirmDialog({
      message: "Do you want to delete selected records?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => mutateEntities({ ids: selectedEntities.map((entity) => entity.id) }),
    });
  };

  const onFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const csvFile = e.target.files?.[0];
    if (!csvFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvTextContent = e.target?.result as string;
      // ...
    };

    reader.readAsText(csvFile);

    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "XXXXX Imported",
      life: 3000,
    });
  };

  // ------- Column Body Templates --------
  const textBodyTemplate = (rowData: XXXXXType, fieldName: string) => {
    return <>{`${rowData[fieldName]}`}</>;
  };

  const imageBodyTemplate = (rowData: XXXXXType, fieldName: string) => {
    return (
      <>
        <Image src={rowData[fieldName]} width="80" preview alt={fieldName} />
      </>
    );
  };

  const actionBodyTemplate = (rowData: XXXXXType) => {
    return (
      <>
        <span className="p-buttonset">
          <Button
            icon="pi pi-pencil"
            severity="info"
            outlined
            onClick={() => navigate("/xxxxx/edit/" + rowData.id)}
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            outlined
            onClick={() => confirmDelete(rowData)}
          />
        </span>
      </>
    );
  };
  // ------- Column Body Templates --------

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <ConfirmDialog />
          <h4 className="mt-0">Manage xxxxx</h4>
          <Datatable
            dataKey="id"
            isLoading={isLoadingEntities}
            value={entities?.data || []}
            selection={selectedEntities}
            onSelectionChange={(e) => setSelectedEntities(e.value as XXXXXType[])}
            confirmBulkDelete={confirmBulkDelete}
            onFileImport={onFileImport}
          >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            {/*TABLE_COLUMNS*/}
            <Column
              header="Action"
              body={actionBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}
            ></Column>
          </Datatable>
        </div>
      </div>
    </div>
  );
};

export default function XXXXXPage() {
  return (
    <Layout>
      <XXXXX />
    </Layout>
  );
}
