import { Button } from "primereact/button";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatatableSkeleton from "./DatatableSkeleton";

interface Props {
  children?: any;
  value: any[];
  selection: any[];
  dataKey: string;
  isLoading?: boolean;
  createNewPageUrl: string;
  onFileImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (event: DataTableSelectionChangeEvent<any>) => void;
  confirmBulkDelete: () => void;
}

export default function Datatable({
  children,
  value,
  dataKey = "id",
  selection,
  onSelectionChange,
  onFileImport,
  confirmBulkDelete,
  isLoading = false,
  createNewPageUrl,
}: Props) {
  const navigate = useNavigate();

  const dt = useRef<DataTable<any[]>>(null);
  const importCsvInputRef = useRef<HTMLInputElement | null>(null);

  const [globalFilter, setGlobalFilter] = useState("");

  const header = (
    <div className="flex justify-content-between">
      <div>
        <Button
          label="Delete Selected"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmBulkDelete}
          disabled={!selection || !selection.length}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          severity="secondary"
          onClick={() => dt.current?.exportCSV()}
          className="ml-2 opacity-70"
        />
        <Button
          label="Import CSV"
          icon="pi pi-file-import"
          severity="secondary"
          className="ml-2 opacity-70"
          onClick={() => importCsvInputRef.current?.click()}
        />
        <input
          ref={importCsvInputRef}
          onChange={onFileImport}
          className="hidden"
          type="file"
          accept=".csv"
        />
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
        <Button label="Add New" icon="pi pi-plus" onClick={() => navigate(createNewPageUrl)} />
      </div>
    </div>
  );

  if (!isLoading)
    return (
      <DataTable
        ref={dt}
        value={value}
        selection={selection}
        onSelectionChange={onSelectionChange}
        dataKey={dataKey}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        globalFilter={globalFilter}
        emptyMessage="No entities found."
        header={header}
        responsiveLayout="scroll"
      >
        {children}
      </DataTable>
    );

  return <DatatableSkeleton />;
}
