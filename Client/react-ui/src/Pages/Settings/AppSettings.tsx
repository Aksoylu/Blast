import { Divider, FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"

export const AppSettings = () => {
    return (
        <div style={{backgroundColor: "white"}}>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>


                <div>
                    hello
                    <Divider orientation='horizontal' />
                    all
                    <Divider orientation='horizontal' />
                </div>
            </FormControl>
        </div>

    )
}