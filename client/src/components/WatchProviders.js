import React from "react";

const WatchProviders = ({ watchProviders }) => {
  const handleRedirect = (local) => {
    switch (local) {
      case "Apple iTunes":
        window.location.href = " https://www.apple.com/itunes/";
        break;
      case "Netflix":
        window.location.href = "https://netflix.com";
        break;
      case "Google Play Movies":
        window.location.href =
          "https://play.google.com/store/movies?hl=en_US&gl=US";
        break;
      case "Amazon Video":
        window.location.href =
          "https://www.amazon.com/Prime-Video/b?node=2676882011";
        break;
      case "YouTube":
        window.location.href = "youtube.com";
        break;
      case "Vudu":
        window.location.href = "https://www.vudu.com/";
        break;
      case "Microsoft Store":
        window.location.href = "https://www.microsoft.com/en-us/movies-and-tv";
        break;
      case "Redbox":
        window.location.href = "redbox.com";
        break;
      case "DIRECTV":
        window.location.href = "https://www.directv.com/movies";
        break;
      default:
        return;
    }
  };

  return (
    <>
      {watchProviders ? (
        <div className="watchProviders">
          {watchProviders.flatrate && (
            <div className="watchProviders-watch">
              <h3>Stream this movie </h3>
              {watchProviders.flatrate.map((item) => {
                return item ? (
                  <img
                    src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                    alt={item.provider_name}
                    onClick={() => {
                      handleRedirect(item.provider_name);
                    }}
                  />
                ) : (
                  <p>loading</p>
                );
              })}
              {watchProviders.rent && (
                <div className="watchProviders-watch">
                  <h3>Rent this movie </h3>
                  {watchProviders.rent.map((item) => {
                    return item ? (
                      <img
                        src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                        alt={item.provider_name}
                        onClick={() => {
                          handleRedirect(item.provider_name);
                        }}
                      />
                    ) : (
                      <h3>loading</h3>
                    );
                  })}
                  {watchProviders.buy && (
                    <div className="watchProviders-watch">
                      <h3>Buy this movie </h3>
                      {watchProviders.buy.map((item) => {
                        return item ? (
                          <img
                            src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                            alt={item.provider_name}
                            onClick={() => {
                              handleRedirect(item.provider_name);
                            }}
                          />
                        ) : (
                          <h3>Loading</h3>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default WatchProviders;
