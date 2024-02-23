module.exports = {
    presets: [
      [
        "next/babel",
        {
          "preset-env": {},
          "preset-react": {},
          "transform-runtime": {},
          "styled-jsx": {},
          "class-properties": {},
        },
      ],
    ],
    plugins: [
      "next/font" // Add the next/font plugin here
    ]
  };
  