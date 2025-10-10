import React, { useState } from 'react';
import { Card, Button, InputField } from '../index';

const UpdateAccount = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Account details updated!');
    }, 1500);
  };

  return (
    <Card title="Update Account Details" padding="lg">
      <div className="space-y-4">
        <InputField label="Username" placeholder="Enter username" />
        <InputField label="Phone Number" placeholder="Enter phone number" />
        <InputField label="Address" placeholder="Enter address" />

        <div className="flex justify-end">
          <Button onClick={handleUpdate} isLoading={loading}>
            Update Account
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UpdateAccount;
