<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SymptoVet | Register Form</title>

    <!-- Logo -->
    <link rel="icon" href="{{ asset('images/Logoblue.png') }}" type="image/png">

    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

</head>

<body class="font-[Poppins] h-screen flex flex-col justify-between bg-gray-100">

    <!-- Page Layout -->
    <div class="flex flex-col justify-center items-center w-full h-full px-6 ">

        <div class="grid md:grid-cols-2 items-center gap-10 w-full max-w-6xl bg-white shadow-xl shadow-blue-500/40 rounded-lg p-8">

            <!-- Left Side (Image) -->
            <div class="hidden md:block">
                <img src="{{ asset('images/vet.png') }}" class="pt-16 w-full h-full object-cover" alt="Vet Illustration" />
            </div>

            <!-- Right Side (Login Card) -->
            <div class="bg-white p-10 max-w-lg w-full">

                <!-- Logo and Home Button inside the card -->
                <div class="flex justify-between items-center mb-6">

                    <!-- Logo (left corner) -->
                    <div class="flex items-center space-x-3 absolute left-52 top-6">
                        <img class="w-14 h-auto" src="{{ asset('images/Logoblue.png') }}" alt="SymptoVet Logo">
                        <span class="text-3xl font-bold">
                            <span class="text-black">Sympto</span>
                            <span class="text-blue-500">Vet</span>
                        </span>
                    </div>

                    <!-- Home Button (right corner) -->
                    <a href="/" aria-label="Home" class="absolute right-52 top-6">
                        <img src="{{ asset('images/home-icon.png') }}" class="w-9 h-9" alt="Home Icon">
                    </a>
                </div>

                <!-- Card Header -->
                <div class="text-center mb-2">
                    <h3 class="text-3xl font-bold text-blue-500 mb-10">Create an Account</h3>
                </div>

                <!-- Registration Form -->
                <form>
                    <!-- Name Input (First Name and Last Name) -->
                    <div class="mb-4 grid grid-cols-2 gap-4">
                        <!-- First Name Input -->
                        <div class="relative flex items-center">
                            <input type="text" name="fname" required
                                class="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-3 outline-none"
                                placeholder="Firstname" />
                        </div>

                        <!-- Last Name Input -->
                        <div class="relative flex items-center">
                            <input type="text" name="lname" required
                                class="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-3 outline-none"
                                placeholder="Lastname" />
                        </div>
                    </div>

                    <div class="mb-4 flex space-x-4">
                        <!-- Role Dropdown -->
                        <div class="flex-1">
                            <div class="relative flex items-center">
                                <select name="role" required
                                    class="w-full text-sm text-gray-800 border border-gray-300 rounded-md focus:border-blue-600 px-4 py-3 outline-none">
                                    <option value="" disabled selected>Select your role</option>
                                    <option value="admin">Fur Mom</option>
                                    <option value="user">Fur Dad</option>
                                    <option value="moderator">Fur Baby</option>
                                </select>
                            </div>
                        </div>

                        <!-- Phone Number Input -->
                        <div class="flex-1">
                            <div class="relative flex items-center">
                                <!-- Philippines Flag Icon -->
                                <span class="absolute left-3">
                                    <img src="{{ asset('images/flag.png') }}" alt="Philippines Flag" class="w-6 h-6">
                                </span>

                                <!-- Phone Number Input -->
                                <input id="phone" type="tel" name="phone" required
                                    class="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 pl-12 py-3 outline-none"
                                    placeholder="Phone number" pattern="^\0\d{9}$" title="Phone number must start with 0 and have 11 digits" />
                            </div>
                        </div>
                    </div>

                    <!-- Email Input -->
                    <div class="mb-4">
                        <div class="relative flex items-center">
                            <input id="email" type="email" name="email" required
                                class="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-3 outline-none"
                                placeholder="Email" />
                            <img src="{{ asset('images/email.png') }}" alt="Email Icon" class="w-5 h-5 absolute right-3">
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div class="mb-4">
                        <div class="relative flex items-center">
                            <input id="password" type="password" name="password" required
                                class="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-3 outline-none"
                                placeholder="Password" />
                            <img id="togglePassword" src="{{ asset('images/eye.png') }}" alt="Show Password"
                                class="w-5 h-5 absolute right-3 cursor-pointer">
                        </div>
                    </div>

                    <!-- Confirm Password Input -->
                    <div class="mb-4">
                        <div class="relative flex items-center">
                            <input id="confirm_password" type="password" name="confirm_password" required
                                class="w-full text-sm border border-gray-300 rounded-md focus:border-blue-600 px-4 py-3 outline-none"
                                placeholder="Confirm Password" />
                            <img id="toggleConfirmPassword" src="{{ asset('images/eye.png') }}" alt="Show Confirm Password"
                                class="w-5 h-5 absolute right-3 cursor-pointer">
                        </div>
                    </div>

                    <!-- Get Started Button -->
                    <button type="submit" class="w-full py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-md transition duration-300">
                        Get Started
                    </button>

                    <!-- Login Link -->
                    <p class="text-gray-800 text-sm text-center mt-4">
                        Already have an account?
                        <a href="{{ route('login') }}" class="text-blue-600 font-semibold hover:underline">Login</a>
                    </p>

                    <!-- OR Separator -->
                    <div class="flex items-center justify-center my-6">
                        <hr class="w-full border-gray-300">
                        <span class="mx-3 text-gray-500 font-medium">or</span>
                        <hr class="w-full border-gray-300">
                    </div>

                    <!-- Google Sign-up Button -->
                    <button class="w-full flex items-center justify-center py-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-200">
                        <img src="{{ asset('images/google.png') }}" class="w-5 mr-3" alt="Google Logo">
                        Sign up with Google
                    </button>

                    <!-- Facebook Sign-up Button -->
                    <button class="w-full flex items-center justify-center py-3 mt-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-gray-200">
                        <img src="{{ asset('images/facebook.png') }}" class="w-5 mr-3" alt="Facebook Logo">
                        Sign up with Facebook
                    </button>
                </form>
            </div>
        </div>

    </div>

</body>

</html>
