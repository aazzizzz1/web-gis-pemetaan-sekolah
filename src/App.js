// src/App.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Legend from "./Components/Legend.jsx";
import Filter from './Components/Filter.jsx';
import Loading from './Components/Loading.jsx';
import MarkerIconSD from './Assets/marker-sd.png';
import MarkerIconSMP from './Assets/marker-smp.png';
import MarkerIconSMA from './Assets/marker-sma.png';
import surabayaGeoJSON from './sbsy.geojsonl.json'; // Import file GeoJSON

// Atur icon default untuk marker (sebagai fallback)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Fungsi untuk mendapatkan ikon berdasarkan bentuk sekolah
const getMarkerIcon = (bentuk) => {
    let iconUrl;
    switch (bentuk) {
        case 'SD':
            iconUrl = MarkerIconSD;
            break;
        case 'SMP':
            iconUrl = MarkerIconSMP;
            break;
        case 'SMA':
            iconUrl = MarkerIconSMA;
            break;
        default:
            iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'; // fallback icon
    }

    return new L.Icon({
        iconUrl,
        iconSize: [25, 41], // ukuran ikon
        iconAnchor: [12, 41], // posisi ikon
        popupAnchor: [1, -34], // posisi popup
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41] // ukuran bayangan
    });
}

function App() {
    const [schools, setSchools] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [kecamatanOptions, setKecamatanOptions] = useState([]);
    const [bentukOptions] = useState(['SD', 'SMP', 'SMA', 'SMK']);
    const [statusOptions] = useState([
        { label: "Negeri", value: "N" },
        { label: "Swasta", value: "S" }
    ]);
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [selectedBentuk, setSelectedBentuk] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api-sekolah-indonesia.vercel.app/sekolah?page=120&perPage=1250');
                const data = await response.json();
                const surabayaSchools = data.dataSekolah.filter(school => school.kabupaten_kota === 'Kota Surabaya');
                setSchools(surabayaSchools);
                setFilteredSchools(surabayaSchools);

                const kecamatanSet = new Set(surabayaSchools.map(school => school.kecamatan));
                setKecamatanOptions([...kecamatanSet]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching school data:', error);
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    useEffect(() => {
        const filterSchools = () => {
            let filtered = schools;
            if (selectedKecamatan) {
                filtered = filtered.filter(school => school.kecamatan === selectedKecamatan);
            }
            if (selectedBentuk) {
                filtered = filtered.filter(school => school.bentuk === selectedBentuk);
            }
            if (selectedStatus) {
                filtered = filtered.filter(school => school.status === selectedStatus);
            }
            setFilteredSchools(filtered);
        };

        filterSchools();
    }, [selectedKecamatan, selectedBentuk, selectedStatus, schools]);

    if (loading) {
        return <Loading />; // render the Loading component while data is being fetched
    }

    return (
        <div>
            <MapContainer center={[-7.250445, 112.768845]} zoom={12} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredSchools.map(school => (
                    <Marker
                        key={school.id}
                        position={[school.lintang, school.bujur]}
                        icon={getMarkerIcon(school.bentuk)}
                    >
                        <Popup>
                            <strong>{school.sekolah}</strong><br />
                            {school.alamat_jalan}<br />
                            {school.kecamatan}, {school.kabupaten_kota}<br />
                            {school.propinsi}
                        </Popup>
                    </Marker>
                ))}
                <GeoJSON data={surabayaGeoJSON} />
            </MapContainer>
            <Legend />
            <Filter
                kecamatanOptions={kecamatanOptions}
                bentukOptions={bentukOptions}
                statusOptions={statusOptions}
                selectedKecamatan={selectedKecamatan}
                setSelectedKecamatan={setSelectedKecamatan}
                selectedBentuk={selectedBentuk}
                setSelectedBentuk={setSelectedBentuk}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />
        </div>
    );
}

export default App;