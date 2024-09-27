import Link from "next/link";
import React from "react";

const FormFooter = ({
  description,
  link,
  path,
}: {
  description: string;
  link: string;
  path: string;
}) => {
  return (
    <div className="mt-2">
      <p className="text-white text-sm font-medium">
        {description}
        <Link
          className="hover:border-b hover:border-white text-main"
          href={path}
        >
          {link}
        </Link>
      </p>
    </div>
  );
};

export default FormFooter;
