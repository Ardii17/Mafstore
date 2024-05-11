import TD from "@/components/elements/tableData";

const Thead = () => {
    return (
      <thead className="bg-gray-200 rounded-t">
        <tr className="">
          <TD rowspan={2} className="rounded-ss border-2 border-white px-2">
            No
          </TD>
          <TD rowspan={2} className="border-2 border-white">
            Image
          </TD>
          <TD rowspan={2} className="border-2 border-white">
            Name
          </TD>
          <TD rowspan={2} className="border-2 border-white">
            Category
          </TD>
          <TD rowspan={2} className="border-2 border-white">
            Price
          </TD>
          <TD colspan={2} className="border-2 border-white px-2">
            Stock
          </TD>
          <TD rowspan={2} className="rounded-se border-2 border-white px-2">
            Action
          </TD>
        </tr>
        <tr>
          <TD className="border-2 border-white px-2">size</TD>
          <TD className="border-2 border-white px-2">qty</TD>
        </tr>
      </thead>
    );
}

export default Thead