<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SymptoVet | Login</title>
    
    <!-- Logo -->
    <link rel="icon" href="{{ asset('images/Logoblue.png') }}" type="image/png">

    <!-- TailwindCSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body class="font-[Poppins] h-screen flex flex-col justify-between">

<!-- Logo at Top Center -->
<div class="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 px-4">
    <img class="w-14 h-auto" src="{{ asset('images/Logoblue.png') }}" alt="SymptoVet Logo">
    <span class="text-3xl font-bold">
        <span class="text-black">Sympto</span>
        <span class="text-blue-500">Vet</span>
    </span>
</div>


        <!-- Home Button at Top Right -->
        <div class="absolute top-4 right-4 flex items-center space-x-2">
            <a href="/" aria-label="Home">
                <img src="{{ asset('images/home-icon.png') }}" class="w-9 h-9 mx-2" alt="Home Icon">
            </a>
        </div>


    <div class="bg-white w-full h-full flex flex-col justify-center p-6">

        <!-- Layout -->
        <div class="grid md:grid-cols-2 items-center gap-10 mt-12">
            
            <!-- Left Side (Image) -->
            <div class="hidden md:block mt-20">
                <img src="{{ asset('images/vet.png') }}" class="w-full h-full object-cover" alt="login-image" />
            </div>

            <!-- Right Side (Form) -->
            <form class="w-full max-w-md mx-auto">
                <h3 class="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Welcome Back!
                </h3>

                <!-- Email Input -->
                <div class="mb-6">
                    <div class="relative flex items-center">
                        <input id="email" type="email" name="email" required class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-3 py-3 outline-none" placeholder="Enter your email" />
                        <img src="{{ asset('images/email.png') }}" alt="Email Icon" class="w-5 h-5 absolute right-3">
                    </div>
                </div>

                <!-- Password Input -->
                <div class="mb-6">
                    <div class="relative flex items-center">
                        <input id="password" type="password" name="password" required class="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-3 py-3 outline-none" placeholder="Enter your password" />
                        <img id="togglePassword" src="{{ asset('images/eye.png') }}" alt="Show Password" class="w-5 h-5 absolute right-3 cursor-pointer">
                    </div>
                </div>

                <!-- Remember Me / Forgot Password -->
                <div class="flex justify-between items-center mb-8">
                    <label class="flex items-center text-gray-700">
                        <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2">
                        Remember me
                    </label>
                    <a href="javascript:void(0);" class="text-blue-600 text-sm font-semibold hover:underline">Forgot Password?</a>
                </div>

                <!-- Login Button -->
                <button type="submit" class="w-full py-3 rounded-md text-white bg-black hover:bg-blue-700 text-lg font-semibold shadow-lg transition duration-300">
                    Login
                </button>

                <!-- Register Link -->
                <p class="text-gray-800 text-sm text-center mt-6">
                    Don't have an account? 
                    <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline">Register</a>
                </p>

                <!-- OR Separator -->
                <div class="flex items-center justify-center my-6">
                    <hr class="w-full border-gray-300">
                    <span class="mx-3 text-gray-500 font-medium">or</span>
                    <hr class="w-full border-gray-300">
                </div>

                <!-- Google Sign-in Button -->
                <div class="mt-6">
                    <button class="w-full flex items-center justify-center py-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-black hover:text-white">
                        <img src="{{ asset('images/google.png') }}" class="w-5 mr-3" alt="Google Logo">
                        Sign in with Google
                    </button>
                </div>

                <!-- Facebook Sign-in Button -->
                <div class="mt-4">
                    <button class="w-full flex items-center justify-center py-3 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all duration-300 hover:bg-black hover:text-white">
                        <img src="{{ asset('images/facebook.png') }}" class="w-5 mr-3" alt="Facebook Logo">
                        Sign in with Facebook
                    </button>
                </div>
            </form>

        </div>       
    </div>

</body>

<script>
    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.src = "{{ asset('images/hide.png') }}"; // Change to "eye-slash" icon when visible
        } else {
            passwordInput.type = 'password';
            this.src = "{{ asset('images/eye.png') }}"; // Change back to "eye" icon when hidden
        }
    });
</script>
</html>
