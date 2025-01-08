<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SymptoVet</title>
    <!-- Logo -->
    <link rel="icon" href="{{ asset('images/Logoblue.png') }}" type="image/png">

    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body class="font-[Poppins]">

    <!-- Navbar -->
    <nav class="bg-white text-black fixed top-0 left-0 w-full z-50 shadow-md shadow-blue-300">
        <div class="flex items-center justify-between p-4 px-6 md:px-12">
            <!-- Logo Section -->
            <div class="flex items-center space-x-2">
                <img class="w-14 h-auto" src="{{ asset('images/Logoblue.png') }}" alt="SymptoVet Logo">
                <span class="text-2xl font-bold">
                    <span class="text-black">Sympto</span>
                    <span class="text-blue-500">Vet</span>
                </span>
            </div>

            <!-- Desktop Menu -->
            <ul class="hidden md:flex text-lg space-x-6">
                <li><a href="#Home" class="hover:bg-blue-500 hover:text-white px-4 py-2 rounded">Home</a></li>
                <li><a href="#Offers" class="hover:bg-blue-500 hover:text-white px-4 py-2 rounded">Offers</a></li>
                <li><a href="#About" class="hover:bg-blue-500 hover:text-white px-4 py-2 rounded">About</a></li>
                <li><a href="#Contact" class="hover:bg-blue-500 hover:text-white px-4 py-2 rounded">Contact</a></li>
            </ul>

            <!-- Log In Button -->
            <div class="hidden md:block">
                <a href="{{ route('login') }}" class="text-lg hover:bg-blue-500 hover:text-white px-4 py-2 rounded">Login</a>
            </div>

            <!-- Mobile Menu Toggle -->
            <button id="menu-toggle" class="md:hidden text-black focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden bg-blue-300 md:hidden">
            <ul class="flex flex-col text-lg space-y-2 p-4 text-center">
                <li><a href="#Home" class="hover:bg-white hover:text-blue-500 px-4 py-2 rounded">Home</a></li>
                <li><a href="#Offers" class="hover:bg-white hover:text-blue-500 px-4 py-2 rounded">Offers</a></li>
                <li><a href="#About" class="hover:bg-white hover:text-blue-500 px-4 py-2 rounded">About</a></li>
                <li><a href="#Contact" class="hover:bg-white hover:text-blue-500 px-4 py-2 rounded">Contact</a></li>
                <li><a href="#" class="bg-blue-700 hover:bg-white hover:text-blue-500 text-white px-4 py-2 rounded">Log In</a></li>
            </ul>
        </div>
    </nav>

</body>
</html>
