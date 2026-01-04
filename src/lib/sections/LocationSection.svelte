<script>
	import { onMount } from 'svelte';
	import { inView } from '$lib/utils/animations';

	/**
	 * @type {string | HTMLElement}
	 */
	let mapContainer;
	/**
	 * @type {import("leaflet").Map | import("leaflet").LayerGroup<any>}
	 */
	let map;
	/**
	 * @type {import("leaflet").Marker<any>}
	 */
	let userMarker;
	let distanceText = '';
	let gettingLocation = false;

	// Koordinat lokasi Rihat
	const latitude = -8.213250060383212;
	const longitude = 114.37569860368967;
	// Fungsi untuk menghitung jarak (Haversine formula)
	/**
	 * @param {number} lat1
	 * @param {number} lon1
	 * @param {number} lat2
	 * @param {number} lon2
	 */
	function calculateDistance(lat1, lon1, lat2, lon2) {
		const R = 6371; // Radius bumi dalam km
		const dLat = ((lat2 - lat1) * Math.PI) / 180;
		const dLon = ((lon2 - lon1) * Math.PI) / 180;
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((lat1 * Math.PI) / 180) *
				Math.cos((lat2 * Math.PI) / 180) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;
		return distance;
	}

	async function getUserLocation() {
		if (!navigator.geolocation) {
			alert('Geolocation tidak didukung oleh browser Anda');
			return;
		}

		gettingLocation = true;

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const userLat = position.coords.latitude;
				const userLon = position.coords.longitude;

				// Import Leaflet
				const L = await import('leaflet');

				// Hapus marker user sebelumnya jika ada
				if (userMarker) {
					map.removeLayer(userMarker);
				}

				// Buat custom icon untuk user location
				const userIcon = L.icon({
					iconUrl:
						'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
					shadowUrl:
						'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
					shadowSize: [41, 41]
				});

				// Tambahkan marker user
				userMarker = L.marker([userLat, userLon], { icon: userIcon })
					.addTo(map)
					.bindPopup('<b>Lokasi Anda</b>')
					.openPopup();

				// Hitung jarak
				const distance = calculateDistance(userLat, userLon, latitude, longitude);
				distanceText =
					distance < 1
						? `Jarak: ${(distance * 1000).toFixed(0)} meter`
						: `Jarak: ${distance.toFixed(2)} km`;

				// Gambar garis dari user ke Rihat
				L.polyline(
					[
						[userLat, userLon],
						[latitude, longitude]
					],
					{
						color: '#592602',
						weight: 3,
						opacity: 0.7,
						dashArray: '10, 10'
					}
				).addTo(map);

				// Zoom map untuk menampilkan kedua marker
				const bounds = L.latLngBounds([
					[userLat, userLon],
					[latitude, longitude]
				]);
				// @ts-ignore
				map.fitBounds(bounds, { padding: [50, 50] });

				gettingLocation = false;
			},
			(error) => {
				console.error('Error getting location:', error);
				alert('Tidak dapat mengambil lokasi Anda. Pastikan Anda memberikan izin akses lokasi.');
				gettingLocation = false;
			}
		);
	}

	onMount(async () => {
		const L = await import('leaflet');
		map = L.map(mapContainer).setView([latitude, longitude], 15);

		// Gunakan CartoDB Voyager tile layer (tema yang lebih mudah dipahami dan bersih)
		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			subdomains: 'abcd',
			maxZoom: 20
		}).addTo(map);

		// Buat custom icon untuk Rihat location
		const rihatIcon = L.icon({
			iconUrl:
				'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});

		// Tambahkan marker di lokasi Rihat
		L.marker([latitude, longitude], { icon: rihatIcon })
			.addTo(map)
			.bindPopup(
				'<b>RIHAT Toko Kopi</b><br>Jl. Lokasi Rihat<br><a href="https://www.google.com/maps/dir/?api=1&destination=' +
					latitude +
					',' +
					longitude +
					'" target="_blank" style="color: #592602; text-decoration: underline;">Buka di Google Maps</a>'
			)
			.openPopup();
	});

	const infoItems = [
		{
			number: '1',
			title: 'Jam Operasional Harian',
			description: 'Jam Operasional Hari Senin - Jumat (09.00 - 23.00)',
			description2: 'Jam Operasional Hari Sabtu - Minggu (06.00 - 23.00)'
		},
		{
			number: '2',
			title: 'Informasi Reservasi',
			description: 'Untuk melakukan reservasi bisa mengubungi admin via WhatsApp disini'
		},
		{
			number: '3',
			title: 'Tersedia Di GoFood & Shopeefood',
			description: 'Nikmati kopi dan menu favoritmu langsung dari rumah lewat aplikasi pesan antar.'
		}
	];
</script>

<section id="location">
	<div class="mt-20 space-y-12 px-4 sm:mt-32 sm:space-y-16 sm:px-8 md:mt-40 md:space-y-20 md:px-20">
		<!-- title -->
		<div
			class="slide-up animate-on-scroll flex flex-col items-center gap-1 text-center sm:gap-2"
			use:inView
		>
			<h1 class="text-2xl font-bold text-[#333333] sm:text-3xl md:text-4xl">
				Information & Location
			</h1>
			<p class="text-base text-[#333333]/70 sm:text-lg">Lorem Ipsum Sit Dolor Amet Concestur</p>
		</div>
		<!-- content -->
		<div class="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-20">
			<!-- map location -->
			<div
				class="slide-left animate-on-scroll h-full w-full md:w-1/2"
				use:inView={{ threshold: 0.3 }}
			>
				<div class="relative">
					<div bind:this={mapContainer} class="h-96 w-full rounded-lg shadow-lg"></div>
					<!-- Tombol Get Location -->
					<button
						on:click={getUserLocation}
						disabled={gettingLocation}
						class="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#592602] shadow-lg transition-all duration-300 hover:bg-[#592602] hover:text-white disabled:opacity-50"
					>
						{#if gettingLocation}
							<span class="animate-spin">⌛</span>
							Mencari...
						{:else}
							📍 Lokasi Saya
						{/if}
					</button>
					<!-- Info Jarak -->
					{#if distanceText}
						<div
							class="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#592602] shadow-lg"
						>
							{distanceText}
						</div>
					{/if}
				</div>
			</div>
			<!-- timeline & button -->
			<div class="slide-right animate-on-scroll w-full md:w-1/2" use:inView={{ threshold: 0.3 }}>
				<!-- timeline -->
				<div>
					{#each infoItems as item}
						<div class="mb-6 flex items-start gap-4 md:mb-8 md:gap-6">
							<!-- number -->
							<div
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#473BF0]/10 p-4 text-[#592602] sm:h-10 sm:w-10 sm:p-6"
							>
								<h4 class="text-base font-medium sm:text-lg">{item.number}</h4>
							</div>
							<!-- description -->
							<div class="flex flex-col gap-1 sm:gap-2">
								<h4 class="text-lg font-bold text-[#333333] sm:text-xl">{item.title}</h4>
								<p class="text-sm text-[#333333]/70 sm:text-base">{item.description}</p>
								{#if item.description2}
									<p class="text-sm text-[#333333]/70 sm:text-base">{item.description2}</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
				<!-- button outline -->
				<div class="mt-6 flex flex-col items-center gap-2 sm:ml-12 sm:flex-row md:mt-0 md:ml-16">
					<a
						href="https://gofood.co.id"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-outline w-full cursor-pointer rounded-sm border-2 border-[#592602] bg-transparent px-8 py-2 text-center font-semibold text-[#592602] transition-all duration-300 sm:w-auto sm:px-12"
					>
						Gofood
					</a>
					<a
						href="https://shopee.co.id/food"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-outline w-full cursor-pointer rounded-sm border-2 border-[#592602] bg-transparent px-8 py-2 text-center font-semibold text-[#592602] transition-all duration-300 sm:w-auto sm:px-12"
					>
						Shopeefood
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
		integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
		crossorigin=""
	/>
</svelte:head>

<style>
	:global(.leaflet-container) {
		z-index: 1;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
