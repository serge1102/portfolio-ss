import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  anchorId: string;
  toAnchor: (anchor: string) => void;
}

function SidebarRow({ Icon, title, anchorId, toAnchor }: Props) {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 group" onClick={() => toAnchor(anchorId)}>
      <Icon className="h-6 w-6 text-sunset-blue group-hover:text-sunset-orange" />
      <p className="text-sunset-blue group-hover:text-sunset-orange text-lg font-semibold">{title}</p>
    </div>
  );
}

export default SidebarRow;
