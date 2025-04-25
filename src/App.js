import React from 'react';

function App({ token, metadata, error }) {
  const [isLoading, setIsLoading] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://cloud-wallet.xfsc.dev/api/dynamic/plugins/plugin-template/application/key/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setSuccess(true);
    } catch (error) {
      error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
      <button className="btn btn-primary" onClick={handleOnClick}>Create Key</button>
      {isLoading && <p>Loading...</p>}
      {success && <p>Key created successfully</p>}
    </div>
  );
}

export default App;
