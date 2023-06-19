import Layout from "@/layout/layout";
import { XXXXXType } from "@/types/xxxxx";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { ColorPicker } from "primereact/colorpicker";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";
import { FileUpload } from "primereact/fileupload";
import { fetcher } from "@/fetcher";
import { ServerResponse } from "@/types/types";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constants";
import { getBase64Url } from "@/utils/images";
import ImageUpload from "@/components/ImageUpload";

function CreateXXXXX() {
  const initialState: XXXXXType = {
    /*INITIAL_STATE_FIELDS*/
  };

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [entity, setEntity] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const { mutate: mutateEntity, isLoading } = fetcher.useMutation<ServerResponse<any>>(
    "/xxxxx/create",
    {
      onSuccess: () => {
        navigate("/xxxxx");
      },
      onError: async ({ data }) => {
        toast.current?.show({
          severity: "error",
          summary: "Error occured",
          detail: data.message,
          life: 3000,
        });
      },
    },
  );

  const saveEntity = async () => {
    setSubmitted(true);

    /*VALIDATE_FIELDS*/ await mutateEntity(entity);
  };

  const onInputChange = (value: any, name: string) => {
    let newEntity = { ...entity };
    newEntity[`${name}`] = value;

    setEntity(newEntity);
  };

  const onInputNumberChange = (value: any, name: string) => {
    let newEntity = { ...entity };
    newEntity[`${name}`] = value;

    setEntity(newEntity);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="grid">
        <div className="col-12 md:col-8 col-offset-2">
          <div className="p-card p-3">
            <div className="card-header flex justify-content-between ">
              <h5 className="card-title">Create XXXXX</h5>
              <Link to="/xxxxx">
                <Button
                  icon="pi pi-backward"
                  label="Back"
                  className="p-button-sm p-button-secondary p-button-secondary"
                />
              </Link>
            </div>

            <div className="p-card-content form">
              <div className="flex flex-wrap align-items-end gap-3">{/*INPUT_FIELDS*/}</div>
            </div>

            <div className="p-card-footer">
              <Button
                className="w-max"
                label="Save"
                icon="pi pi-check"
                loading={isLoading}
                onClick={saveEntity}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CreateXXXXXPage() {
  return (
    <Layout>
      <CreateXXXXX />
    </Layout>
  );
}
