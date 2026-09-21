import { IoIosCheckmarkCircleOutline } from "react-icons/io";


export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="min-h-screen w-full flex flex-col items-center justify-between bg-linear-to-b from-gray-50 to-gray-100 sm:px-4 lg:px-0"
    >
      {/* Logo Container */}
      <div className="flex flex-col items-center justify-center mt-16 sm:mt-20">

        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-25 md:h-25 bg-white rounded-3xl shadow-lg flex items-center justify-center">
              {/* Checkmark Icon */}
            <IoIosCheckmarkCircleOutline className="w-15 h-15" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 mt-8 tracking-wide">
          Routines
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-500 font-medium">
          Habit Tracker
        </p>
      </div>

      {/* Bottom Section */}
      <div className="sm:mb-16 md:mb-20 lg:mb-24 flex flex-col items-center">
        {/* Tagline */}
        <p className="text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-widest sm:mb-8 font-semibold">
          Cultivate Intentionality
        </p>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          {/* Progress Bar */}
          <div className="w-32 sm:w-40 md:w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gray-800 rounded-full animate-slide"></div>
          </div>

          {/* Loading Text */}
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            Preparing your ritual...
          </p>
        </div>
      </div>
    </div>
  );
}