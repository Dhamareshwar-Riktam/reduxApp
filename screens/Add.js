import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Text,
    Button,
    Heading,
    VStack,
    Box,
    Input
} from 'native-base';
import shortid from 'shortid';
import propTypes from 'prop-types';
import { addSeason } from '../src/action/list';
import { connect } from 'react-redux';


const Add = ({ navigation, addSeason }) => {
    const [name, setName] = useState('');
    const [totalNoSeason, setTotalNoSeason] = useState('');

    const handleSubmit = async () => {
        try {
            if (!name || !totalNoSeason) {
                return alert('Please add both fields');
            }

            const seasonToAdd = {
                id: shortid.generate(),
                name,
                totalNoSeason,
                isWatched: false
            }

            addSeason(seasonToAdd);

            navigation.navigate('Home');
        } catch (error) {
            return console.warn(error)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Heading size='xl' style={styles.heading}>Add to Watch List</Heading>
            <VStack>
                <Box style={styles.formItem}>
                    <Input
                        placeholder='Season Name'
                        value={name}
                        style={{ color: '#eee' }}
                        onChangeText={text => setName(text)}
                        variant='rounded'
                    />
                </Box>
                <Box style={styles.formItem}>
                    <Input
                        placeholder='Total Number of Seasons'
                        value={totalNoSeason}
                        style={{ color: '#eee' }}
                        onChangeText={text => setTotalNoSeason(text)}
                        variant='rounded'
                    />
                </Box>
                <Button
                    variant='outline'
                    borderRadius='full'
                    onPress={handleSubmit}
                >Add</Button>
            </VStack>
        </ScrollView>
    );
};

Add.propTypes = {
    addSeason: propTypes.func.isRequired
};

const mapDispatchToProps = {
    addSeason: data => addSeason(data)
}

export default connect(null, mapDispatchToProps)(Add);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#1B262C',
        paddingHorizontal: 8
    },
    heading: {
        textAlign: 'center',
        color: '#00B7C2',
        marginHorizontal: 5,
        marginTop: 50,
        marginBottom: 20
    },
    formItem: {
        marginBottom: 20
    }
});