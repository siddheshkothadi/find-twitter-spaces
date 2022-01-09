import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function getAllSpeakers(space, users) {}

function SpaceCard(props) {
  const { space, users } = props;

  // React.useEffect(() => {
  //   console.log(space);
  //   console.log(users);
  // }, [space]);

  return (
    <a
      className="w-full flex justify-center items-center h-full min-w-0"
      href={`https://twitter.com/i/spaces/${space.id}`}
      target="_blank"
    >
      <div
        className="bg-opacity-40 bg-gray-800 rounded-xl pt-4 flex flex-col min-w-0 justify-evenly w-full md:max-w-xs lg:max-w-sm xl:max-w-lg 2xl:max-w-xl mb-6 space-y-6 md:m-2 cursor-pointer"
        style={{
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="px-4">
          <div className="flex flex-row items-center space-x-2">
            <FontAwesomeIcon
              icon={faVolumeUp}
              className="text-white text-4xl"
            />
            <h2>LIVE</h2>
          </div>
          <div className="flex flex-row items-center space-x-2 flex-wrap min-w-0">
            <p className="text-white text-2xl font-semibold pt-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
              {space.title}
            </p>
          </div>
          <div className="flex flex-row">
            <div></div>
            <div>{`${space.participant_count} listening`}</div>
          </div>
        </div>
        <div className="mt-auto flex flex-col px-4 py-2 rounded-b-xl space-y-2">
          <div className="flex flex-row space-x-3 items-center">
            {space.host_ids && (
              <>
                <img
                  src={
                    users.find((user) => user.id === space.host_ids[0])
                      .profile_image_url
                  }
                  className="rounded-full h-6 w-6"
                />
                <p className="text-lg overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {users.find((user) => user.id === space.host_ids[0]).name}
                </p>
                <span className="px-2 py-1 rounded-lg">
                  <p className="text-sm text-white font-light">Host</p>
                </span>
              </>
            )}
          </div>
          {space.host_ids && (
            <p className="text-md text-white font-light overflow-ellipsis overflow-hidden whitespace-nowrap">
              {users.find((user) => user.id === space.host_ids[0]).description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default SpaceCard;
