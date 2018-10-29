import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDeck } from '../utils/api'

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
                {totalQuestions && <Text>{`${questionIndex + 1}/${totalQuestions}`}</Text>}
                {
                    (questions && answerText) ? <Text>{questions[questionIndex].answer}</Text> :
                    null
                }
                {
                    (questions && !answerText) ? <Text>{questions[questionIndex].question}</Text> :
                    null
                }
                <TouchableOpacity onPress={this.showAnswerOrQuestion}>
                    <Text>{answerText ? `Question` : `Answer`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>(this.handleAnswer('correct'))}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (this.handleAnswer('inCorrect'))}>
                    <Text>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }
}