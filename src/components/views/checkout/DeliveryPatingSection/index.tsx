import { convertIDR } from "@/utils/currency";

export default function DeliveryPayingSection(props: {
  totalPrice: number;
  deliveryCost: number;
}) {
  return (
    <div className="p-4 bg-white rounded shadow h-auto">
      <p className="text-blue-700 text-lg">Pengiriman dan Pembayaran</p>
      <hr className="my-4" />
      <div className="flex gap-2 max-sm:flex-col">
        <div className="w-1/5 max-sm:w-full">
          <p>Metode Pengiriman</p>
        </div>
        <div className="w-2/5 max-sm:w-full">
          <p className="font-semibold">JNE</p>
          <p className="text-sm opacity-70">
            Waktu Garansi Tiba Sampai: 30 Maret 2024
          </p>
          <p className="text-sm opacity-70">
            Jaminan mendapatkan voucher diskon 10% jika lebih dari 30 Maret 2024
          </p>
        </div>
        <div className="w-1/5 flex items-center md:justify-center max-sm:w-full">
          <p>{convertIDR(props.deliveryCost)}</p>
        </div>
        <div className="w-1/5 flex items-center md:justify-center max-sm:w-full">
          <button className="py-2 px-3 text-white bg-blue-700 rounded max-sm:w-full">
            Ubah Pengiriman
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex gap-2 max-sm:flex-col">
        <div className="w-1/5 flex items-center max-sm:w-full">
          <p>Metode Pembayaran</p>
        </div>
        <div className="w-3/5 flex items-center max-sm:w-full">
          <p>Cash of Delivery (COD)</p>
        </div>
        <div className="w-1/5 flex items-center justify-center max-sm:w-full">
          <button className="py-2 px-3 text-white bg-blue-700 rounded max-sm:w-full">
            Ubah Pembayaran
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex gap-2 flex-col max-sm:w-full md:w-96 md:float-end">
        <table>
          <tbody>
            <tr>
              <td className="py-2 max-sm:text-sm">Total Barang</td>
              <td>{convertIDR(props.totalPrice)}</td>
            </tr>
            <tr>
              <td className="py-2 max-sm:text-sm">Estimasi Pengiriman</td>
              <td>{convertIDR(props.deliveryCost)}</td>
            </tr>
            <tr>
              <td className="py-2 max-sm:text-sm">Biaya Penanganan</td>
              <td>{convertIDR(5000)}</td>
            </tr>
            <tr>
              <td className="py-2 max-sm:text-sm">
                Total Pemesanan Yang Dibayar
              </td>
              <td>
                {convertIDR(props.totalPrice + props.deliveryCost + 5000)}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-end">
                <button className="w-full py-2 bg-blue-700 text-white rounded my-2 font-semibold">
                  Buat Pesanan
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}