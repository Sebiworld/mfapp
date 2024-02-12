import { Box, Sheet, FormControl, FormLabel, Input, Button, Typography } from '@mui/joy';
import { Link } from '@tanstack/react-router';

export const DefaultPage = () => {

  console.log('TEST', {
    __APP_ENV__: process.env.__APP_ENV__,
    __APP_GIT_COMMIT_REF__: process.env.__APP_GIT_COMMIT_REF__,
    __APP_GIT_COMMIT_SHA__: process.env.__APP_GIT_COMMIT_SHA__,
    __APP_APIURL__: process.env.__APP_APIURL__,
    __APP_APIKEY__: process.env.__APP_APIKEY__,
    __APP_LGLIC__: process.env.__APP_LGLIC__,
  });
  return (
    <Box>
      <Sheet
        variant="soft"
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
      >
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="spassword" placeholder="password" />
        </FormControl>

        <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
        <Typography endDecorator={<Link href="/sign-up">Sign up</Link>} fontSize="sm" sx={{ alignSelf: 'center' }}>
          Don't have an account?
        </Typography>
      </Sheet>
    </Box>
  );
};
