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
import { fetcher } from "@/usefetcher";
import { ServerResponse } from "@/types/types";
import { Image } from "primereact/image";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const XXXXX = () => {
  const navigate = useNavigate();
  const importCsvInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedEntities, setSelectedEntities] = useState<XXXXXType[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<XXXXXType[]>>(null);
  const { data: entities, refetchData: refetchEntities } =
    fetcher.useGET<ServerResponse<XXXXXType[]>>("/xxxxx");

  const { postData: deleteEntities } = fetcher.usePOST<ServerResponse<any>>("/xxxxx/delete", {
    onSuccess: async ({ message }) => {
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: message,
        life: 3000,
      });

      refetchEntities().then();
    },
    onError: async ({ fetchResponse }) => {
      const error = (await fetchResponse.json()) as ServerResponse<any>;
      toast.current?.show({
        severity: "error",
        summary: "Error occured",
        detail: error.message,
        life: 3000,
      });
    },
  });

  const { deleteData } = fetcher.useDELETE<ServerResponse<any>>({
    onSuccess: async ({ message }) => {
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: message,
        life: 3000,
      });
      refetchEntities().then();
    },
    onError: async ({ fetchResponse }) => {
      const error = (await fetchResponse.json()) as ServerResponse<any>;

      toast.current?.show({
        severity: "error",
        summary: "Error occured",
        detail: error.message,
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
      accept: () => deleteData(`/xxxxx/${rowData.id}`),
    });
  };

  const confirmBulkDelete = () => {
    confirmDialog({
      message: "Do you want to delete selected records?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteEntities({ ids: selectedEntities.map((entity) => entity.id) }),
    });
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
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
          <Button icon="pi pi-trash" severity="danger" outlined onClick={() => confirmDelete(rowData)} />
        </span>
      </>
    );
  };
  // ------- Column Body Templates --------

  const header = (
    <div className="flex justify-content-between">
      <div>
        <Button
          label="Delete Selected"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmBulkDelete}
          disabled={!selectedEntities || !selectedEntities.length}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          severity="secondary"
          onClick={exportCSV}
          className="ml-2 opacity-70"
        />
        <Button
          label="Import CSV"
          icon="pi pi-file-import"
          severity="secondary"
          className="ml-2 opacity-70"
          onClick={() => importCsvInputRef.current?.click()}
        />
        <input ref={importCsvInputRef} onChange={onFileImport} className="hidden" type="file" accept=".csv" />
      </div>
      <div>
        <span className="p-input-icon-left mr-2">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder="Search..."
          />
        </span>
        <Button label="Add New" icon="pi pi-plus" onClick={() => navigate("/xxxxx/create")} />
      </div>
    </div>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <ConfirmDialog />
          <h4 className="mt-0">Manage xxxxx</h4>
          <DataTable
            ref={dt}
            value={entities?.data || []}
            selection={selectedEntities}
            onSelectionChange={(e) => setSelectedEntities(e.value as XXXXXType[])}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} xxxxx"
            globalFilter={globalFilter}
            emptyMessage="No xxxxx found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column
              field="name"
              header="Name"
              sortable
              body={(rowData) => textBodyTemplate(rowData, "name")}
              headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column header="Image" body={(rowData) => imageBodyTemplate(rowData, "image")}></Column>
            {/*TABLE_COLUMNS*/}
            <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
          </DataTable>
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
