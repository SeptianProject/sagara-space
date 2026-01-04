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
				<img src={mapLocation} alt="Map Location" class="w-full rounded-lg" />
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
					<button
						class="btn-outline w-full cursor-pointer rounded-sm border-2 border-[#592602] bg-transparent px-8 py-2 font-semibold text-[#592602] transition-all duration-300 sm:w-auto sm:px-12"
					>
						Gofood
					</button>
					<button
						class="btn-outline w-full cursor-pointer rounded-sm border-2 border-[#592602] bg-transparent px-8 py-2 font-semibold text-[#592602] transition-all duration-300 sm:w-auto sm:px-12"
					>
						Shopeefood
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
