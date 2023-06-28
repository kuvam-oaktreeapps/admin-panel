import { BASE_URL } from "@/constants";
import { getBase64Url } from "@/utils/images";
import { getLabel } from "@/utils/strings";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

interface Props {
  fieldName: string;
  folder: string;
  value: any;
  error: boolean;
  onUpload: (url: string) => any;
}

export default function ImageUpload({ folder, fieldName, value, onUpload, error }: Props) {
  const toastRef = useRef<Toast>(null);
  const [onEditPage, setEdit] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    setEdit(window.location.pathname.includes("/edit/") && value);
  }, [value]);

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center">
          <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        {isUploaded ? (
          <Tag value="Success" severity="success" className="px-3 py-2 ml-2" />
        ) : (
          <Tag value="Pending" severity="warning" className="px-3 py-2 ml-2" />
        )}
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={props.onRemove}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }} className="my-5">
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  if (onEditPage) {
    return (
      <div className="field w-full">
        <Toast ref={toastRef} />

        <p>{getLabel(fieldName)}</p>
        <div className="relative w-max">
          {value && (
            <>
              <Image preview src={value} width="250" className="border-circle" />
              <div
                style={{ position: "absolute", top: 10, right: 10 }}
                className="bg-blue-500 border-circle cursor-pointer"
                onClick={() => setEdit(false)}
              >
                <i className="m-2 text-lg pi pi-pencil text-white" />
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classNames("field w-full", { "p-invalid": error })}>
        <Toast ref={toastRef} />

        <FileUpload
          className="w-full"
          accept="image/*"
          mode="advanced"
          customUpload
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          auto
          uploadHandler={async (e) => {
            const file = await getBase64Url(e.files[0]);

            const res = await fetch(`${BASE_URL}/s3/upload`, {
              method: "POST",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("auth_token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                file,
                folder,
              }),
            });

            const response = await res.json();

            if (response.status !== 200) {
              return toastRef?.current?.show({
                severity: "error",
                summary: "Error occured",
                detail: response.message,
              });
            }

            onUpload(response.data);
            setIsUploaded(true);
          }}
          chooseOptions={{
            icon: "pi pi-fw pi-images",
            iconOnly: true,
            className: "custom-choose-btn p-button-rounded p-button-outlined",
          }}
        />
      </div>
    );
  }
}
