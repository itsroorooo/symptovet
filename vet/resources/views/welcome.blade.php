@include('layouts.navbar')

    <!-- Main Section -->
    <section id="Home" class="flex flex-col-reverse md:flex-row items-center max-w-full mx-auto px-6 md:px-16 pt-20 space-y-4 md:space-y-6 md:space-x-4">
        <!-- Content -->
        <div class="md:w-1/2 md:text-center">
            <h1 class="text-3xl md:text-5xl font-bold text-black leading-tight transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110">
                Your Best Option for Pet Care Solutions
            </h1>
            <p class="mt-6 text-lg md:text-xl text-gray-700 py-6">
                Where health is best! Our platform instantly connects you to personalized pet care solutions, ensuring your furry
                friends receive the attention they need right at home. Experience peace of mind knowing that, with us, your pets
                are always just a step away from the care they deserve, keeping tails wagging and hearts happy!
            </p>

            <!-- Get Started -->
            <div class="mt-6 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110">
                <a href="#" class="text-lg bg-blue-500 hover:bg-black text-white px-6 py-3 rounded shadow">
                    Get Started
                </a>
            </div>
        </div>

        <!-- Image -->
        <div class="md:w-1/2 flex items-center justify-center px-6 md:px-12 pt-8">
            <img class="w-full h-auto object-contain" src="{{ asset('images/bkg.png') }}" alt="Pet Care Image">
        </div>
    </section>

   <!-- Offers Section -->
    <section id="Offers" class="mx-auto py-4 px-10 bg-blue-400">
        <h2 class="font-bold mt-4 text-center text-5xl text-white leading-tight transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110">
            What Does Our Website Offer?
        </h2>

        <!-- Images with Text -->
        <div class="flex justify-center space-x-8 py-14">
            <div class="relative rounded-2xl w-[400px] h-[300px] overflow-hidden group">
                <img src="{{ asset('images/map.png') }}" alt="" class="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
                    Find the nearest vet clinic for you!
                </div>
            </div>

            <div class="relative rounded-2xl w-[400px] h-[300px] overflow-hidden group">
                <img src="{{ asset('images/book.jpeg') }}" alt="" class="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
                    Easily book appointments!
                </div>
            </div>

            <div class="relative rounded-2xl w-[400px] h-[300px] overflow-hidden group">
                <img src="{{ asset('images/expert.jpg') }}" alt="" class="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110">
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
                    Get the best expert advice!
                </div>
            </div>
        </div>
    </section>

    <!-- Abou Us -->
    <section id="About" class="flex flex-col-reverse md:flex-row">
        <div class="pt-28 w-full">
            <img " src="{{ asset('images/cat.png') }}" alt="">
        </div>

        <div class="mx-28">
            <h2 class="font-bold text-5xl mt-28 p-4 text-center">
                Know More About Our Website
            </h2>

            <p class="mt-20 text-lg px-16 text-justify">
                SymptoVet is designed to simplify pet care by offering a seamless way for pet owners to connect with nearby
                vet clinics. Our platform allows you to quickly find the best available clinics, book appoinments, and access expert
                advice for your pet's health. Wetherit's routine care or an emergency, we're here to ensure your pets
                recieved the attention they deserved.
            </p>
        </div>
    </section>


</body>

<script>
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    </script>

</html>
