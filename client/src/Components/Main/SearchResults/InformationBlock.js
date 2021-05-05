import React from "react";

const InformationBlock = () => {
  return (
    <div>
      {listItemData !== undefined
        ? listItemData.map((data) => (
            <div key={data.id}>
              <h1>{data.title}</h1>

              <Image
                src={data.images[0].url === "" ? fern : data.images[0].url}
                fluid
              />
              <div style={{ display: "none" }}>Hello World</div>
              <p>{data.audioDescription}</p>
              {"\n"}
              <p>
                {data.isOpenToPublic === "1"
                  ? "Open to public"
                  : "Not open to public"}
              </p>
              <div>
                <a href={data.url}>See More Information</a>
              </div>
              {/* <div>{data.bodyText}</div> */}
            </div>
          ))
        : ""}
    </div>
  );
};

export default InformationBlock;
