import CheckoutView from "@/components/views/checkout";
import userServices from "@/services/user";
import { AddressTypes, KotaTypes, Product, ProvinsiTypes } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [checkoutProducts, setCheckoutProducts] = useState<Product[]>([]);
  const [address, setAddress] = useState<AddressTypes[]>([]);
  const [provinsi, setProvinsi] = useState<ProvinsiTypes[]>([]);
  const [idProvinsi, setIdProvinsi] = useState(0);
  const [kota, setKota] = useState<KotaTypes[]>([]);
  const [idKota, setIdKota] = useState(0);
  const [kecamatan, setKecamatan] = useState<KotaTypes[]>([]);
  const [idKecamatan, setIdKecamatan] = useState(0);
  const [kelurahan, setKelurahan] = useState<KotaTypes[]>([]);
  const [idKelurahan, setIdKelurahan] = useState(0);
  const session: any = useSession();

  const getCarts = async () => {
    const { data } = await userServices.getCarts(session.data?.accessToken);
    setCheckoutProducts(data.data);
  };

  const getAddress = async () => {
    const { data } = await userServices.getAddress(session.data?.accessToken);
    setAddress(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) {
      try {
        getCarts();
        getAddress();
      } catch (error) {
        console.log(error);
      }
    }
  }, [session]);

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
    <CheckoutView
      checkoutProducts={checkoutProducts}
      address={address}
      provinsi={provinsi}
      kota={kota}
      kecamatan={kecamatan}
      kelurahan={kelurahan}
      idProvinsi={idProvinsi}
      idKota={idKota}
      idKecamatan={idKecamatan}
      idKelurahan={idKelurahan}
      setIDProvinsi={setIdProvinsi}
      setIDKota={setIdKota}
      setIDKecamatan={setIdKecamatan}
      setIDKelurahan={setIdKelurahan}
    />
  );
};

export default CheckoutPage;
