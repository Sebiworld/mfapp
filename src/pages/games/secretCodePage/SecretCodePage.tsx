import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { secretCodePageStyles } from "./secretCodePage.styles";
import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import EmergencyIcon from "@mui/icons-material/Emergency";
import TagIcon from "@mui/icons-material/Tag";
import { useReward } from "react-rewards";
import { useGlobalStore } from "@src/store/global.store";
import { selectProjects } from "@src/store/projects/projects.selectors";
import { isValidObject } from "@utils/functions/isValidObject";

export const SecretCodePage = () => {
  const loadedProjects = useGlobalStore(selectProjects);
  const projectColors = useMemo(() => {
    if (!isValidObject(loadedProjects)) {
      return undefined;
    }

    return Object.values(loadedProjects).reduce((acc, curr) => {
      if (curr?.color) {
        acc.push(`#${curr.color}`);
      }
      return acc;
    }, [] as string[]);
  }, [loadedProjects]);

  const starRewardId = useId();
  const { reward: starReward, isAnimating: starRewardIsAnimating } = useReward(
    starRewardId,
    "confetti",
    {
      position: "absolute",
      colors: projectColors,
    }
  );

  const successRewardId = useId();
  const { reward: successReward } = useReward(successRewardId, "balloons", {
    position: "absolute",
    colors: projectColors,
  });

  const solution = useMemo(() => [9, 7, 4, 5], []);
  const [numbers, setNumbers] = useState<number[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const clickNumber = useCallback(
    (num: number) => {
      if (isError) {
        // On error: Start with new attempt
        setIsError(false);
        setNumbers([num]);
        return;
      }

      setNumbers((prevNumbers) => [...prevNumbers, num]);
    },
    [isError]
  );

  const blockNumbers = isProcessing || isSuccess;

  const clearCode = useCallback(() => {
    setNumbers([]);
    setIsError(false);
    setIsSuccess(false);
    starReward();
  }, [starReward]);

  const canSubmit = useMemo(() => {
    if (isSuccess || isProcessing) {
      return false;
    }

    if (!solution.length) {
      return true;
    }

    return numbers.length >= solution.length;
  }, [isProcessing, isSuccess, numbers.length, solution.length]);

  const submitCode = useCallback(() => {
    if (isProcessing || !canSubmit) {
      return;
    }

    setIsProcessing(true);

    const isCorrect = numbers.every((num, index) => num === solution[index]);

    timeoutRef.current = setTimeout(() => {
      if (isCorrect) {
        setIsSuccess(true);
        setIsError(false);
        successReward();
      } else {
        setIsError(true);
        setIsSuccess(false);
      }

      setIsProcessing(false);
    }, 2000);
  }, [canSubmit, isProcessing, numbers, solution, successReward]);

  const placeholders = useMemo(() => {
    const length = solution.length - numbers.length;
    return new Array(length).fill("_");
  }, [numbers.length, solution.length]);

  return (
    <Box className="secret-code-page" sx={secretCodePageStyles}>
      <Typography variant="h6" align="center">
        Gib den geheimen Code ein!
      </Typography>

      <Box className="numbers-grid">
        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(1)}
          disabled={blockNumbers}
        >
          1
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(2)}
          disabled={blockNumbers}
        >
          2
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(3)}
          disabled={blockNumbers}
        >
          3
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(4)}
          disabled={blockNumbers}
        >
          4
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(5)}
          disabled={blockNumbers}
        >
          5
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(6)}
          disabled={blockNumbers}
        >
          6
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(7)}
          disabled={blockNumbers}
        >
          7
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(8)}
          disabled={blockNumbers}
        >
          8
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(9)}
          disabled={blockNumbers}
        >
          9
        </Button>

        <Button
          variant="contained"
          color="contrast"
          id={starRewardId}
          onClick={clearCode}
          disabled={starRewardIsAnimating}
        >
          <EmergencyIcon />
        </Button>

        <Button
          variant="contained"
          color="contrast"
          onClick={() => clickNumber(0)}
          disabled={blockNumbers}
        >
          0
        </Button>

        <Button
          variant="contained"
          color="contrast"
          disabled={!canSubmit}
          onClick={submitCode}
        >
          <TagIcon />
        </Button>
      </Box>

      <Box
        className={`selected-numbers ${isError ? "error" : ""} ${
          isSuccess ? "success" : ""
        }`}
      >
        <Typography>Eingegebener Code:</Typography>

        <Box className="code-container" id={successRewardId}>
          {numbers.map((v, index) => (
            <Box key={index} className="number-item">
              {v}
            </Box>
          ))}

          {placeholders.map((v, index) => (
            <Box key={index} className="number-item">
              {v}
            </Box>
          ))}
        </Box>

        {isError && (
          <Alert severity="error" variant="filled">
            Das war leider falsch.
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success" variant="filled">
            Goldrichtig! Gut gemacht!
          </Alert>
        )}

        {!!isProcessing && (
          <Box className="loading-overlay">
            <LinearProgress />
            <Typography variant="body1">Überprüfe Code...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
