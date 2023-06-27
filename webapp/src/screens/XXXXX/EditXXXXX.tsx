import Layout from "@/layout/layout";
import { XXXXXType } from "@/types/xxxxx";
import { Button } from "primereact/button";
import { InputNumberValueChangeEvent } from "primereact/inputnumber";
import { DropdownChangeEvent } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetcher } from "@/fetcher";
import { ServerResponse } from "@/types/types";
import { BASE_URL } from "@/constants";
import { getBase64Url } from "@/utils/images";
import FormInputText from "@/components/FormFields/FormInputText";
import FormInputDropdown from "@/components/FormFields/FormInputDropdown";
import FormInputTextarea from "@/components/FormFields/FormInputTextarea";
import FormInputCalendar from "@/components/FormFields/FormInputCalendar";
import FormInputColorPicker from "@/components/FormFields/FormInputColorPicker";
import FormInputEditor from "@/components/FormFields/FormInputEditor";
import FormInputNumber from "@/components/FormFields/FormInputNumber";
import FormInputSwitch from "@/components/FormFields/FormInputSwitch";
import FormInputRadio from "@/components/FormFields/FormInputRadio";
import FormInputUpload from "@/components/FormFields/FormInputUpload";
import FormInputPassword from "@/components/FormFields/FormInputPassword";
import { useForm } from "react-hook-form";

function EditXXXXX() {
  const params = useParams();

  const initialState: XXXXXType = {
    /*INITIAL_STATE_FIELDS*/
  };

  const id = params.id;

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const entity = fetcher.useQuery<ServerResponse<XXXXXType>>(`/xxxxx/${id}`);

  const { mutate: mutateEntity, isLoading } = fetcher.useMutation("/", {
    method: "PATCH",
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
  });

  const { control, handleSubmit } = useForm<XXXXXType>({ defaultValues: entity.data?.data });

  const saveEntity = async (data: XXXXXType) => {
    await mutateEntity(`/xxxxx`, data);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="grid">
        <div className="col-12 md:col-8 col-offset-2">
          <div className="p-card p-3">
            <div className="card-header flex justify-content-between ">
              <h5 className="card-title">Edit XXXXX</h5>
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
                onClick={handleSubmit(saveEntity)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function EditXXXXXPage() {
  return (
    <Layout>
      <EditXXXXX />
    </Layout>
  );
}
