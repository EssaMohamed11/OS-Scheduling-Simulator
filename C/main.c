#include <stdio.h>
#include "scheduler.h"

// this is a placeholder main function to demonstrate how the C backend can be structured.
// all the data if hardcoded for testing purposes.
int main(int argc, char *argv[]) {
	/* For quick backend testing, we only confirm input is received. */
	if (argc > 1 && argv[1] != NULL) {
		fprintf(stderr, "Received input from backend:\n%s\n", argv[1]);
	}

	printf("{\n");
	printf("  \"rr\": {\n");
	printf("    \"gantt\": [\n");
	printf("      { \"pid\": \"P1\", \"arrival\": 0, \"start\": 0, \"end\": 2 },\n");
	printf("      { \"pid\": \"P2\", \"arrival\": 1, \"start\": 2, \"end\": 4 },\n");
	printf("      { \"pid\": \"P3\", \"arrival\": 2, \"start\": 4, \"end\": 6 },\n");
	printf("      { \"pid\": \"P1\", \"arrival\": 0, \"start\": 6, \"end\": 8 },\n");
	printf("      { \"pid\": \"P4\", \"arrival\": 3, \"start\": 8, \"end\": 10 },\n");
	printf("      { \"pid\": \"P2\", \"arrival\": 1, \"start\": 10, \"end\": 12 },\n");
	printf("      { \"pid\": \"P5\", \"arrival\": 4, \"start\": 12, \"end\": 14 },\n");
	printf("      { \"pid\": \"P3\", \"arrival\": 2, \"start\": 14, \"end\": 16 }\n");
	printf("    ],\n");
	printf("    \"metrics\": { \"avg_wt\": 3.1, \"avg_tat\": 6.4, \"avg_rt\": 1.7 },\n");
	printf("    \"processes\": [\n");
	printf("      { \"pid\": \"P1\", \"arrival\": 0, \"burst\": 5, \"wt\": 3, \"tat\": 8, \"rt\": 0 },\n");
	printf("      { \"pid\": \"P2\", \"arrival\": 1, \"burst\": 4, \"wt\": 5, \"tat\": 9, \"rt\": 1 },\n");
	printf("      { \"pid\": \"P3\", \"arrival\": 2, \"burst\": 6, \"wt\": 4, \"tat\": 10, \"rt\": 2 },\n");
	printf("      { \"pid\": \"P4\", \"arrival\": 3, \"burst\": 3, \"wt\": 2, \"tat\": 5, \"rt\": 5 },\n");
	printf("      { \"pid\": \"P5\", \"arrival\": 4, \"burst\": 2, \"wt\": 1, \"tat\": 3, \"rt\": 8 }\n");
	printf("    ]\n");
	printf("  },\n");
	printf("  \"srtf\": {\n");
	printf("    \"gantt\": [\n");
	printf("      { \"pid\": \"P1\", \"arrival\": 0, \"start\": 0, \"end\": 1 },\n");
	printf("      { \"pid\": \"P2\", \"arrival\": 1, \"start\": 1, \"end\": 3 },\n");
	printf("      { \"pid\": \"P4\", \"arrival\": 3, \"start\": 3, \"end\": 5 },\n");
	printf("      { \"pid\": \"P2\", \"arrival\": 1, \"start\": 5, \"end\": 7 },\n");
	printf("      { \"pid\": \"P5\", \"arrival\": 4, \"start\": 7, \"end\": 8 },\n");
	printf("      { \"pid\": \"P3\", \"arrival\": 2, \"start\": 8, \"end\": 11 },\n");
	printf("      { \"pid\": \"P1\", \"arrival\": 0, \"start\": 11, \"end\": 14 },\n");
	printf("      { \"pid\": \"P4\", \"arrival\": 3, \"start\": 14, \"end\": 16 }\n");
	printf("    ],\n");
	printf("    \"metrics\": { \"avg_wt\": 2.2, \"avg_tat\": 5.1, \"avg_rt\": 0.9 },\n");
	printf("    \"processes\": [\n");
	printf("      { \"pid\": \"P1\", \"arrival\": 0, \"burst\": 5, \"wt\": 2, \"tat\": 7, \"rt\": 0 },\n");
	printf("      { \"pid\": \"P2\", \"arrival\": 1, \"burst\": 4, \"wt\": 3, \"tat\": 7, \"rt\": 0 },\n");
	printf("      { \"pid\": \"P3\", \"arrival\": 2, \"burst\": 6, \"wt\": 4, \"tat\": 10, \"rt\": 6 },\n");
	printf("      { \"pid\": \"P4\", \"arrival\": 3, \"burst\": 3, \"wt\": 1, \"tat\": 4, \"rt\": 0 },\n");
	printf("      { \"pid\": \"P5\", \"arrival\": 4, \"burst\": 2, \"wt\": 1, \"tat\": 3, \"rt\": 3 }\n");
	printf("    ]\n");
	printf("  }\n");
	printf("}\n");

	return 0;
}
