import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import React from "react";
const mathIcon = () => <span style={{ fontWeight: "bold" }}>∑</span>;

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    {
      title: "Post",
      name: "post",
      type: "document",
      fields: [
        {
          title: "Title",
          name: "title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Date",
          name: "date",
          type: "date",
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Slug",
          name: "slug",
          type: "slug",
          options: {
            source: "title",
          },
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Tag",
          name: "tag",
          type: "string",
          options: {
            list: ["technical"],
          },
        },
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [
            {
              type: "block",
              of: [
                {
                  type: "latex",
                  title: "Inline Math",
                  icon: mathIcon,
                  options: {
                    modal: { type: "popover" },
                  },
                },
              ],
            },
            { type: "code" },
            { type: "image" },
            {
              type: "latex",
              title: "Block Math",
              icon: mathIcon,
              options: {
                modal: { type: "popover" },
              },
            },
          ],
        },
      ],
    },
  ]),
});
