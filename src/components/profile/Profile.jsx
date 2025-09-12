import React, { useEffect, useState } from "react";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { fetcherGet, fetcherPut } from "../../utils/fetcher";
import { APIS } from "../../utils/apiConstant";

export default function Profile() {
  const [profile, setProfile] = useState({});
  useEffect(()=> {
    (async ()=> {
      try {
        const data = await fetcherGet(APIS.USER_PROFILE);
        setProfile(data);
      } catch (err) { console.error(err); }
    })();
  }, []);

  const handleSave = async () => {
    try {
      await fetcherPut(APIS.UPDATE_PROFILE, profile);
      alert("Saved");
    } catch (err) { alert(err?.message || "Save failed"); }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mb:2 }}>My Profile</Typography>
      <Paper sx={{ p:2 }}>
        <TextField label="Name" fullWidth value={profile.name||""} onChange={e=>setProfile({...profile, name:e.target.value})} sx={{ mb:2 }} />
        <TextField label="Email" fullWidth value={profile.email||""} disabled sx={{ mb:2 }} />
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Paper>
    </Container>
  );
}
