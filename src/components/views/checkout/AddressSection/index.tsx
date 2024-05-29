import userServices from "@/services/user";
import { AddressTypes, KotaTypes, ProvinsiTypes } from "@/types";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

function ItsNotOnAddress(props: {
  address: AddressTypes[];
  onEditSection: boolean;
  setOnAddAddress: Dispatch<SetStateAction<boolean>>;
  setOnEditSection: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="md:w-4/5 overflow-auto lg:w-2/5 h-4/5 bg-white rounded-md shadow relative max-sm:w-full mx-2 max-sm:pb-12">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="text-lg text-blue-700">Alamat Saya</p>
          <i
            className="bx bx-x text-2xl cursor-pointer"
            onClick={() => props.setOnEditSection(false)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <hr className="w-full h-1 my-4" />
          {props.address &&
            props.address.map((address: AddressTypes, index: number) => (
              <>
                <div
                  className="flex gap-4 items-start cursor-pointer"
                  key={index}
                >
                  <input
                    type="radio"
                    name="address"
                    className="w-4 h-4"
                    checked={address.isMain}
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-4 items-center justify-between w-full">
                      <div className="flex gap-2 items-center">
                        <p>{address.receipment}</p>
                        <hr className="h-6 w-[1px] bg-gray-500" />
                        <p>{address.phone}</p>
                      </div>
                      <button className="text-blue-700 text-sm">Ubah</button>
                    </div>
                    <p>{address.addressLine}</p>
                  </div>
                </div>
                <hr className="w-full h-1" />
              </>
            ))}
          <button
            className="flex gap-2 items-center py-1 px-3 max-w-44 justify-center bg-blue-700 rounded text-white max-sm:hidden"
            onClick={() => props.setOnAddAddress(true)}
          >
            <i className="bx bx-plus text-2xl" />
            <p>Tambah Alamat</p>
          </button>
        </div>
      </div>
      <div className="fixed sm:w-full max-sm:left-0 max-sm:right-0 max-sm:mx-2 max-sm:bottom-[4.45rem] rounded-b md:w-4/5 md:bottom-8 max-md:bottom-8 lg:bottom-3 lg:w-2/5 md:-translate-y-full bg-white">
        <div className="flex max-sm:flex-row md:flex-col justify-end">
          <hr className="max-sm:hidden md:block h-1" />
          <button
            className="flex gap-2 items-center py-1 px-3 max-w-44 m-2 justify-center bg-blue-700 rounded text-white md:hidden"
            onClick={() => props.setOnAddAddress(true)}
          >
            <i className="bx bx-plus text-2xl" />
            <p>Tambah Alamat</p>
          </button>
          <button className="flex gap-2 items-center py-2 px-3 max-w-44 m-2 justify-center bg-blue-700 rounded text-white md:place-self-end">
            <p>Konfirmasi</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function ItsOnAddress(props: {
  address: AddressTypes[];
  onEditSection: boolean;
  setOnAddAddress: Dispatch<SetStateAction<boolean>>;
  setOnEditSection: Dispatch<SetStateAction<boolean>>;
}) {
  let newAddress = [];
  const [provinsi, setProvinsi] = useState<ProvinsiTypes[]>([]);
  const [idProvinsi, setIDProvinsi] = useState(0);
  const [kota, setKota] = useState<KotaTypes[]>([]);
  const [idKota, setIDKota] = useState(0);
  const [kecamatan, setKecamatan] = useState<KotaTypes[]>([]);
  const [idKecamatan, setIDKecamatan] = useState(0);
  const [kelurahan, setKelurahan] = useState<KotaTypes[]>([]);
  const [idKelurahan, setIDKelurahan] = useState(0);
  const session: any = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const addressLine =
      kelurahan.find((item) => item.id === idKelurahan)?.nama +
      ", " +
      kecamatan.find((item) => item.id === idKecamatan)?.nama +
      ", " +
      kota.find((item) => item.id === idKota)?.nama +
      ", " +
      provinsi.find((item) => item.id === idProvinsi)?.nama;

    const data = {
      addressLine,
      receipment: form.nama.value,
      phone: form.phone.value,
      note: form.note.value,
      isMain: form.isMain.checked,
    };

    if (form.isMain.checked && props.address) {
      let newAddressChecked = props.address.map((item: AddressTypes) => {
        if (item.isMain) {
          return { ...item, isMain: false };
        }
        return item;
      });
      newAddress = [...newAddressChecked, data];
    } else if (props.address && props.address.length > 0) {
      newAddress = [...props.address, data];
    } else {
      newAddress = [data];
    }

    try {
      const result = await userServices.updateAddress(
        session.data?.accessToken,
        { address: newAddress }
      );

      if (result.status === 200) {
        props.setOnEditSection(false);
        props.setOnAddAddress(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinsi = async () => {
    const data = await fetch(
      "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
    );

    if (!data.ok) {
      console.error("Failed to fetch data");
    }

    const response = await data.json();
    setProvinsi(response.provinsi);
  };

  const getKota = async () => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`
    );

    if (!data.ok) {
      console.error("Failed to fetch data");
    }

    const response = await data.json();
    setKota(response.kota_kabupaten);
  };

  const getKecamatan = async () => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKota}`
    );

    if (!data.ok) {
      console.error("Failed to fetch data");
    }

    const response = await data.json();
    setKecamatan(response.kecamatan);
  };

  const getKelurahan = async () => {
    const data = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
    );

    if (!data.ok) {
      console.error("Failed to fetch data");
    }

    const response = await data.json();
    setKelurahan(response.kelurahan);
  };

  useEffect(() => {
    getProvinsi();
  }, []);

  useEffect(() => {
    if (idProvinsi !== 0) {
      getKota();
    }
  }, [idProvinsi]);

  useEffect(() => {
    if (idKota !== 0) {
      getKecamatan();
    }
  }, [idKota]);

  useEffect(() => {
    if (idKecamatan !== 0) {
      getKelurahan();
    }
  }, [idKecamatan]);

  return (
    <div className="max-sm:w-full overflow-auto md:w-4/5 lg:w-2/5 h-4/5 bg-white rounded-md shadow relative mx-2 max-sm:pb-12">
      <form onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-lg">Alamat Baru</p>
            <i
              className="bx bx-x text-2xl cursor-pointer"
              onClick={() => props.setOnEditSection(false)}
            />
          </div>
          <hr className="my-4 sm:hidden md:block h-2" />
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 w-full justify-between">
              <input
                type="text"
                className="p-2 border w-1/2 rounded"
                name="nama"
                placeholder="Nama Lengkap"
                required
              />
              <input
                type="text"
                className="p-2 border w-1/2 rounded"
                name="phone"
                placeholder="Nomor Handphone"
                required
              />
            </div>
            <div className="flex max-sm:flex-col gap-4">
              <div className="relative w-full">
                <i className="bx bx-chevron-down absolute top-1/2 right-2 text-xl -translate-y-1/2" />
                <select
                  name="provinsi"
                  className="p-2 border w-full rounded"
                  required
                  onChange={(e) => setIDProvinsi(Number(e.target.value))}
                >
                  <option value="" selected disabled>
                    Pilih Provinsi
                  </option>
                  {provinsi.map((provinsi: ProvinsiTypes) => (
                    <option
                      key={provinsi.id}
                      value={provinsi.id}
                      className="text-black p-2"
                    >
                      {provinsi.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-full">
                <i className="bx bx-chevron-down absolute top-1/2 right-2 text-xl -translate-y-1/2" />
                <select
                  name="kota"
                  className="p-2 border w-full rounded"
                  required
                  disabled={idProvinsi === 0}
                  onChange={(e) => setIDKota(Number(e.target.value))}
                >
                  <option value="" selected disabled>
                    Pilih Kota
                  </option>
                  {kota.map((kota: KotaTypes) => (
                    <option
                      key={kota.id}
                      value={kota.id}
                      className="text-black p-2"
                    >
                      {kota.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex max-sm:flex-col gap-4">
              <div className="relative w-full">
                <i className="bx bx-chevron-down absolute top-1/2 right-2 text-xl -translate-y-1/2" />
                <select
                  name="kecamatan"
                  className="p-2 border w-full rounded"
                  required
                  disabled={idKota === 0}
                  onChange={(e) => setIDKecamatan(Number(e.target.value))}
                >
                  <option value="" selected disabled>
                    Pilih Kecamatan
                  </option>
                  {kecamatan.map((kecamatan: KotaTypes) => (
                    <option
                      key={kecamatan.id}
                      value={kecamatan.id}
                      className="text-black p-2"
                    >
                      {kecamatan.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative w-full">
                <i className="bx bx-chevron-down absolute top-1/2 right-2 text-xl -translate-y-1/2" />
                <select
                  name="kelurahan"
                  className="p-2 border w-full rounded"
                  required
                  disabled={idKecamatan === 0}
                  onChange={(e) => setIDKelurahan(Number(e.target.value))}
                >
                  <option value="" selected disabled>
                    Pilih Kelurahan
                  </option>
                  {kelurahan.map((kelurahan: KotaTypes) => (
                    <option
                      key={kelurahan.id}
                      value={kelurahan.id}
                      className="text-black p-2"
                    >
                      {kelurahan.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <textarea
              name="note"
              required
              className="p-2 border w-full resize-none rounded"
              placeholder="RT, RW, Nama Jalan, Gedung, Nomor Rumah, Warna Rumah"
            ></textarea>
            <p>Tandai sebagai :</p>
            <div className="flex gap-4">
              <label htmlFor="home">Rumah</label>
              <input
                type="radio"
                id="home"
                name="status"
                className="py-2 px-3 border rounded"
              />
              <label htmlFor="office">Kantor</label>
              <input
                type="radio"
                id="office"
                name="status"
                className="py-2 px-3 border rounded"
              />
            </div>
            <div className="flex gap-4">
              <input type="checkbox" className="w-4" name="isMain" />
              <p className="text-sm opacity-70">
                Tetapkan sebagai Alamat Utama
              </p>
            </div>
          </div>
        </div>
        <div className="fixed sm:w-full max-sm:left-0 max-sm:right-0 max-sm:mx-2 max-sm:bottom-[4.45rem] rounded-b md:w-4/5 md:bottom-8 max-md:bottom-8 lg:bottom-3 lg:w-2/5 md:-translate-y-full bg-white">
          <div className="flex flex-col">
            <hr className="max-sm:hidden md:block h-1" />
            <div className="flex items-center justify-end">
              <button
                className="place-self-end flex gap-2 items-center py-2 px-3 max-w-44 m-2 justify-center bg-blue-700 rounded text-white"
                onClick={() => {
                  props.setOnAddAddress(false),
                    setIDProvinsi(0),
                    setIDKota(0),
                    setIDKecamatan(0),
                    setIDKelurahan(0);
                }}
              >
                <p>Batalkan</p>
              </button>
              <button
                type="submit"
                className="place-self-end flex gap-2 items-center py-2 px-3 max-w-44 m-2 justify-center bg-blue-700 rounded text-white"
              >
                <p>Konfirmasi</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AddressSection(props: { address: AddressTypes[] }) {
  const addressMain = props.address?.find((address) => address.isMain);
  const [onEditSection, setOnEditSection] = useState(false);
  const [onAddAddress, setOnAddress] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div>
        <div className="flex gap-2 items-center">
          <i className="bx bx-map text-2xl text-blue-700 " />
          <p className="text-blue-700 text-lg">Alamat Pengiriman</p>
        </div>
        <hr className="my-4 sm:hidden md:block" />
        <div className="flex md:flex-row sm:flex-col max-sm:flex-col max-sm:gap-1">
          <div className="w-1/6 max-sm:min-w-full">
            <p className="text-lg max-sm:text-sm">{addressMain?.receipment}</p>
            <p className="max-sm:text-sm">{addressMain?.phone}</p>
          </div>
          <hr className="w-[3px] h-[100%] bg-gray-200 rounded-full sm:hidden md:block" />
          <div className="w-4/6 sm:px-2 md:px-4 max-sm:min-w-full max-sm:text-sm">
            <p className={`${addressMain !== undefined ? "block" : "hidden"}`}>
              {addressMain?.note}, {addressMain?.addressLine}
            </p>
          </div>
          <div className="w-1/6 flex items-center justify-center max-sm:min-w-full">
            <button
              className="flex px-3 py-1 rounded items-center justify-center gap-2 bg-blue-700 max-sm:w-full"
              onClick={() => {
                setOnEditSection(true), setOnAddress(false);
              }}
            >
              <i className="bx bx-edit text-xl text-white" />
              <p className="text-white">Ubah Alamat</p>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          onEditSection ? "block" : "hidden"
        } fixed top-0 flex items-center justify-center right-0 bottom-0 left-0 w-full h-screen z-10`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {onAddAddress ? (
          <ItsOnAddress
            address={props.address}
            onEditSection={onEditSection}
            setOnEditSection={setOnEditSection}
            setOnAddAddress={setOnAddress}
          ></ItsOnAddress>
        ) : (
          <ItsNotOnAddress
            address={props.address}
            onEditSection={onEditSection}
            setOnEditSection={setOnEditSection}
            setOnAddAddress={setOnAddress}
          ></ItsNotOnAddress>
        )}
      </div>
    </div>
  );
}
