import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import {
    Text,
    VStack,
    HStack,
    Heading,
    Center,
    Box,
    Button,
    Checkbox,
    Fab
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import porpTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeSeason, markComplete } from '../src/action/list';


const Home = ({ navigation, markComplete, removeSeason, listState }) => {
    // const [listState, setListState] = useState([1, 2]);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {listState.length === 0 ? (
                <VStack style={styles.emptyContainer}>
                    <Heading size='xl' style={styles.heading}>Watchlist is empty, start by adding one</Heading>
                </VStack>
            ) : (
                <Center w="100%">
                    <Box w="100%" p={5}>
                        <Heading size='xl' style={styles.heading}>Next Series to Watch</Heading>
                        <VStack space={2}>
                            {listState.map((season, seasonI) => (
                                <HStack
                                    w="100%"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    key={season.id + seasonI.toString()}
                                    space={2}
                                    flexWrap="wrap"
                                >
                                    {/* <Button
                                        style={styles.actionButton}
                                        onPress={() => navigation.navigate('Edit', { season })}
                                    >
                                        <Icon name="edit" size={18} color="#fff" />
                                    </Button> */}
                                    <Button
                                        style={styles.actionButton}
                                        colorScheme='danger'
                                        onPress={() => removeSeason(season.id)}
                                        mt={2}
                                    >
                                        <Icon name="trash" size={18} color="#fff" />
                                    </Button>
                                    <VStack
                                        justifyContent="space-between"
                                        alignItems="center"
                                        flexWrap="wrap"
                                    >
                                        <Text
                                            strikeThrough={season.isWatched}
                                            _light={{
                                                color: season.isWatched ? "gray.400" : "coolGray.800"
                                            }} _dark={{
                                                color: season.isWatched ? "gray.400" : "coolGray.50"
                                            }}
                                            style={styles.seasonName}
                                            textAlign="center"
                                        >
                                            {season.name}
                                        </Text>
                                        <Text style={{ color: "#888", textAlign: 'center' }}>{season.totalNoSeason} seasons to watch</Text>

                                    </VStack>
                                    <Checkbox
                                        isChecked={season.isWatched}
                                        onChange={() => markComplete(season.id)}
                                        value={season.id}
                                        accessibilityLabel={season.name}
                                    />
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </Center>
            )}

            <Fab
                style={{ backgroundColor: "#5067FF" }}
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={<Icon name="plus" size={16} color="#fff" />}
                placement='bottom-right'
                onPress={() => navigation.navigate('Add')}
            />
        </ScrollView>
    );
};

const mapStateToProps = state => ({
    listState: state.list
});

const mapDispatchToProps = {
    removeSeason: id => removeSeason(id),
    markComplete: id => markComplete(id)
};

Home.propTypes = {
    removeSeason: porpTypes.func.isRequired,
    markComplete: porpTypes.func.isRequired,
    listState: porpTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);


const styles = StyleSheet.create({
    emptyContainer: {
        backgroundColor: '#1B262C',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#1B262C',
        flex: 1
    },
    heading: {
        textAlign: 'center',
        color: '#00B7C2',
        marginVertical: 15,
        marginHorizontal: 5
    },
    actionButton: {
        marginLeft: 5
    },
    seasonName: {
        color: '#FDCB9E',
        textAlign: 'justify'
    },
    listItem: {
        marginLeft: 0,
        marginBottom: 20
    }
});