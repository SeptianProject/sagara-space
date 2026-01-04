<script>
	import { inView } from '$lib/utils/animations';
	import { getCloudinaryUrl } from '$lib/utils/cloudinary';
	const mapLocation = getCloudinaryUrl('rihat/uploads/map-location.webp', 'fullOptimized');

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

<section>
	<div class="mt-40 space-y-20 px-20">
		<!-- title -->
		<div class="slide-up animate-on-scroll flex flex-col items-center gap-2 text-center" use:inView>
			<h1 class="text-4xl font-bold text-[#333333]">Information & Location</h1>
			<p class="text-lg text-[#333333]/70">Lorem Ipsum Sit Dolor Amet Concestur</p>
		</div>
		<!-- content -->
		<div class="flex items-center justify-between gap-20">
			<!-- map location -->
			<div class="slide-left animate-on-scroll h-full w-1/2" use:inView={{ threshold: 0.3 }}>
				<img src={mapLocation} alt="Map Location" />
			</div>
			<!-- timeline & button -->
			<div class="slide-right animate-on-scroll" use:inView={{ threshold: 0.3 }}>
				<!-- timeline -->
				<div>
					{#each infoItems as item}
						<div class="mb-8 flex items-start gap-6">
							<!-- number -->
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-[#473BF0]/10 p-6 text-[#592602]"
							>
								<h4 class="text-lg font-medium">{item.number}</h4>
							</div>
							<!-- description -->
							<div class="flex flex-col gap-2">
								<h4 class="text-xl font-bold text-[#333333]">{item.title}</h4>
								<p class="text-[#333333]/70">{item.description}</p>
								{#if item.description2}
									<p class="text-[#333333]/70">{item.description2}</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
				<!-- button outline -->
				<div class="ml-16 flex items-center gap-2">
					<button
						class="btn-outline cursor-pointer rounded-sm border-2 border-[#592602] bg-transparent px-12 py-2 font-semibold text-[#592602] transition-all duration-300"
					>
						Gofood
					</button>
					<button
						class="btn-outline cursor-pointer rounded-sm border-2 border-[#592602] bg-transparent px-12 py-2 font-semibold text-[#592602] transition-all duration-300"
					>
						Shopeefood
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
