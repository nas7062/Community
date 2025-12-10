import React from "react";
import { Control, Controller } from "react-hook-form";
import InputField from "./InputField";

type IntroduceInputProps<TFieldValues extends { descript: string }> = {
  control: Control<TFieldValues>;
};

function IntroduceInputInner<TFieldValues extends { descript: string }>({
  control,
}: IntroduceInputProps<TFieldValues>) {
  return (
    <Controller
      name={"descript" as any}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="소개"
          placeholder="소개할 내용을 입력해주세요."
          value={value}
          onChangeText={onChange}
          textContentType="username"
        />
      )}
    />
  );
}

const IntroduceInput = <TFieldValues extends { descript: string }>(
  props: IntroduceInputProps<TFieldValues>
) => <IntroduceInputInner {...props} />;

export default IntroduceInput;
