import { StyleSheet, View } from "react-native";
import React from "react";
import { Paragraph } from "./Paragraph";
import { getVoteColor } from "@app/utils/utils";
import PropTypes from "prop-types";

export const Score = ({ score }) => {
  return (
    <View style={styles.voteContainer}>
      <View style={[styles.vote, { borderColor: getVoteColor(score) }]}>
        <Paragraph style={styles.voteText}>
          {Math.round(score * 10) / 10}
        </Paragraph>
      </View>
    </View>
  );
};

const voteSize = 40;

const styles = StyleSheet.create({
  voteContainer: {
    height: voteSize,
    // borderWidth: 1,
    borderColor: "green",
  },
  vote: {
    borderWidth: 4,
    width: voteSize,
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: voteSize / 2,
  },
  voteText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

Score.propTypes = {
  score: PropTypes.number,
};
