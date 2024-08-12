import React, { useContext } from 'react';
import { GlobalStateContext } from '../helper/context';

const WeatherCard = () => {
  const { globalData } = useContext(GlobalStateContext);

  if (!globalData) {
    console.error("globalData is undefined or null");
    return <div> </div>;
  }

  const parseData = (data) => {
    const sections = data.split('##').filter(section => section.trim() !== '');

    return sections.map(section => {
      const [title, ...content] = section.split('\n**').map(line => line.trim());

      const parsedContent = content.map(subSection => {
        const [subTitle, ...descriptions] = subSection.split('\n-').map(item => item.trim());

        return {
          subTitle: subTitle.replace(':', ''),
          descriptions: descriptions.map(description => description.trim())
        };
      });

      return {
        title: title.trim(),
        content: parsedContent
      };
    });
  };

  const parsedData = parseData(globalData);

  return (
    <div className='w-full flex flex-col justify-center mb-36 mt-6'>

      {parsedData.map((section, index) => (
        <div key={index} className="relative bg-gradient-to-br from-blue-400 to-blue-700 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 p-6 mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white text-center">{section.title}</h2>
          {section.content.map((subSection, subIndex) => (
            <div key={subIndex} className="text-white text-left mb-4">
              <h3 className="text-2xl font-semibold mb-2">{subSection.subTitle}</h3>
              <ul className="list-disc list-inside space-y-2">
                {subSection.descriptions.map((description, descIndex) => (
                  <li key={descIndex}>{description}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeatherCard;
