import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDeck } from '../utils/api';
import { green, red, white } from '../utils/colors';

export default class Quiz extends Component {

    state = {
        numberCorrect: 0,
        totalQuestions: null,
        questionIndex: 0,
        answerText: false,
        questions: null,
        deckTitle: ''
    }

    // Show the answer or question depending on the toggle state
    showAnswerOrQuestion = () => {
        this.setState(currentState => ({
            answerText: !currentState.answerText
        }));
    }

    handleAnswer = (correct) => {
        this.setState(currentState => ({
            questionIndex: currentState.questionIndex + 1,
            numberCorrect: (correct === "correct") ? currentState.numberCorrect + 1 : currentState.numberCorrect
        }))
    }

    static getDerivedStateFromProps(props) {
        let initialState = props.navigation.state.params.state;
        if(initialState) {
        var resetInitialState = {
            ...initialState
        }
        //reset the state of the navigator for when the quiz gets restarted
        props.navigation.state.params.state = null;
        return resetInitialState;
        }
        return null
    }

    componentDidMount() {
        const {id} = this.props.navigation.state.params 
        getDeck(id).then((result)=>{      
            this.setState({
                questions: result.questions,
                totalQuestions: result.questions.length,
                deckTitle: id
            });
        });
    }

    shouldComponentUpdate( nextProp , nextState) {
        const { totalQuestions, questionIndex, numberCorrect, deckTitle } = nextState;
        let initialState = this.props.navigation.state.params.state;
        if (!initialState && totalQuestions && questionIndex + 1 > totalQuestions) {
            //send a copy of the initial state
            let state = {
                numberCorrect: 0,
                totalQuestions: nextState.totalQuestions,
                questionIndex: 0,
                answerText: false,
                questions: nextState.questions,
                deckTitle: deckTitle
            };
            this.props.navigation.navigate('Results', { totalQuestions, numberCorrect, state: state })
            return false
        }
        return true
    }

    render() {
        const { questionIndex, questions, totalQuestions, answerText } = this.state;
        return (
            <View>
                {totalQuestions && <Text style={styles.total}>{`${questionIndex + 1}/${totalQuestions}`}</Text>}
                <View style={styles.container}>
                {
                    (questions && answerText) ? <Text style={styles.title}>{questions[questionIndex].answer}</Text> :
                    null
                }
                {
                    (questions && !answerText) ? <Text style={styles.title}>{questions[questionIndex].question}</Text> :
                    null
                }
                <TouchableOpacity onPress={this.showAnswerOrQuestion}>
                    <Text style={[styles.toggleAnswer, styles.total]}>{answerText ? `Question` : `Answer`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.correctBtn} onPress={()=>(this.handleAnswer('correct'))}>
                    <Text style={styles.correctness}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.startBtn} onPress={() => (this.handleAnswer('inCorrect'))}>
                    <Text style={styles.correctness}>Incorrect</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },

    correctness: {
        textAlign: 'center',
        color : white,
        fontSize: 16
    },
    total: {
        fontSize: 16
    },
    toggleAnswer: {
        paddingTop: 10,
        paddingBottom : 80,
        color: red,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    correctBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: green,
        backgroundColor: green,
        borderStyle: 'solid',
        borderRadius: 2,
        paddingTop: 15,
        paddingBottom: 15
    },
    startBtn: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: red,
        backgroundColor: red,
        borderStyle: 'solid',
        borderRadius: 2,
        paddingTop: 15,
        paddingBottom: 15
    }
});