import React from "react";
import { Control, Controller } from "react-hook-form";
import InputField from "./InputField";

type NameInputProps<TFieldValues extends { name: string }> = {
  control: Control<TFieldValues>;
};

function NameInputInner<TFieldValues extends { name: string }>({
  control,
}: NameInputProps<TFieldValues>) {
  return (
    <Controller
      name={"name" as any}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="이름"
          placeholder="이름을 입력해주세요."
          value={value}
          onChangeText={onChange}
          textContentType="username"
        />
      )}
    />
  );
}

const NameInput = <TFieldValues extends { name: string }>(
  props: NameInputProps<TFieldValues>
) => <NameInputInner {...props} />;

export default NameInput;
