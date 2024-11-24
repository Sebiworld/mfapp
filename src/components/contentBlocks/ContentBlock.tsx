import React from "react";
import { ContentText } from "./variants/ContentText";
import { ContentBlockTextDto } from "@models/content/content-block-text-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { ContentForm } from "./variants/ContentForm";
import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";

export interface ContentBlocksProps {
  block: ContentBlockDtoVariant;
}

export const ContentBlock: React.FC<ContentBlocksProps> = ({ block }) => {
  console.log('CONTENT BLOCK', block.type, block)
  if (block.type === "text") {
    return (
      <ContentText
        key={block.id}
        block={block as ContentBlockTextDto}
      ></ContentText>
    );
  }
  if (block.type === "form") {
    return (
      <ContentForm
        key={block.id}
        block={block as ContentBlockFormDto}
      ></ContentForm>
    );
  }
  return <></>;
};
