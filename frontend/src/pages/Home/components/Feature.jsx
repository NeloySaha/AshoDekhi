export const Feature = ({ idx, title, description, image_path }) => {
  const featureSvgs = {
    "Unparalleled Cinematic Experience": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon"
        viewBox="0 0 512 512"
      >
        <path
          d="M374.79 308.78L457.5 367a16 16 0 0022.5-14.62V159.62A16 16 0 00457.5 145l-82.71 58.22A16 16 0 00368 216.3v79.4a16 16 0 006.79 13.08z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <path
          d="M268 384H84a52.15 52.15 0 01-52-52V180a52.15 52.15 0 0152-52h184.48A51.68 51.68 0 01320 179.52V332a52.15 52.15 0 01-52 52z"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="32"
        />
      </svg>
    ),
    "Delight in Dolby Atmos": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon"
        viewBox="0 0 512 512"
      >
        <path
          d="M192 218v-6c0-14.84 10-27 24.24-30.59l174.59-46.68A20 20 0 01416 154v22"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <path
          d="M416 295.94v80c0 13.91-8.93 25.59-22 30l-22 8c-25.9 8.72-52-10.42-52-38h0a33.37 33.37 0 0123-32l51-18.15c13.07-4.4 22-15.94 22-29.85V58a10 10 0 00-12.6-9.61L204 102a16.48 16.48 0 00-12 16v226c0 13.91-8.93 25.6-22 30l-52 18c-13.88 4.68-22 17.22-22 32h0c0 27.58 26.52 46.55 52 38l22-8c13.07-4.4 22-16.08 22-30v-80"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
    ),
    "Tantalizing Treats": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon"
        viewBox="0 0 512 512"
      >
        <path
          d="M322 416c0 35.35-20.65 64-56 64H134c-35.35 0-56-28.65-56-64M336 336c17.67 0 32 17.91 32 40h0c0 22.09-14.33 40-32 40H64c-17.67 0-32-17.91-32-40h0c0-22.09 14.33-40 32-40"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
        />
        <path
          d="M344 336H179.31a8 8 0 00-5.65 2.34l-26.83 26.83a4 4 0 01-5.66 0l-26.83-26.83a8 8 0 00-5.65-2.34H56a24 24 0 01-24-24h0a24 24 0 0124-24h288a24 24 0 0124 24h0a24 24 0 01-24 24zM64 276v-.22c0-55 45-83.78 100-83.78h72c55 0 100 29 100 84v-.22M241 112l7.44 63.97"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
        />
        <path
          d="M256 480h139.31a32 32 0 0031.91-29.61L463 112"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M368 112l16-64 47-16"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M224 112h256"
        />
      </svg>
    ),
    "Luxurious Escape": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="feature-icon"
        viewBox="0 0 512 512"
      >
        <rect
          x="32"
          y="144"
          width="400"
          height="224"
          rx="45.7"
          ry="45.7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="32"
        />
        <rect
          x="85.69"
          y="198.93"
          width="154.31"
          height="114.13"
          rx="4"
          ry="4"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="32"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M480 218.67v74.66"
        />
      </svg>
    ),
  };

  return (
    <div className="feature-content">
      {idx % 2 === 0 && (
        <img className="feature-img" src={image_path} alt={title} />
      )}

      <div className="feature-text">
        {featureSvgs[`${title}`]}
        <p className="feature-text-heading">{title}</p>
        <p className="feature-text-details">{description}</p>
      </div>

      {idx % 2 !== 0 && (
        <img className="feature-img" src={image_path} alt={title} />
      )}
    </div>
  );
};
