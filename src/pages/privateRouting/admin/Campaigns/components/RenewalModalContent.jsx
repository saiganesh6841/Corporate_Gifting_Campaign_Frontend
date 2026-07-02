import { Combobox, Field, Option } from "@fluentui/react-components";
import SubscriptionCard from "./SubscriptionCard";
import { useEffect, useState } from "react";
import { Box, Button, Radio } from "@mui/material";
import useAlert from "../../../../../hooks/useAlert";
const constantRenewalData = {
  modeOfPayment: null,
  selectedChallenges: [],
  subscriptionId: null,
};

function RenewalModalContent({
  classes,
  subscriptionList,
  challengesList,
  services,
  closeModal,
}) {
  const [errors, setErrors] = useState({});
  const { publishNotification } = useAlert();
  const [renewalData, setRenewalData] = useState({
    ...constantRenewalData,
    subscriptionId:
      subscriptionList?.length > 0 ? subscriptionList?.[0]?._id : null,
    challengesAccess: subscriptionList?.[0]?.challengesAccess,
    discountAmount: subscriptionList?.[0]?.discountAmount,
    discountPercent: subscriptionList?.[0]?.discountPercent,
    discountType: subscriptionList?.[0]?.discountType,
    planName: subscriptionList?.[0]?.planName,
    planType: subscriptionList?.[0]?.planType,
    totalAmount: subscriptionList?.[0]?.totalAmount,
    planAmount: subscriptionList?.[0]?.planAmount,
  });
  const [noOfChallengeAccess, setNoOfChallengeAccess] = useState(
    subscriptionList?.length > 0
      ? subscriptionList?.[0]?.challengesAccess
      : null
  );
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(0);

  const handleSubscriptionCardClick = (index, sub) => {
    setSelectedSubscriptionId(index);
    setRenewalData((p) => ({
      ...p,
      subscriptionId: sub?._id,
      challengesAccess: sub?.challengesAccess,
      discountAmount: sub?.discountAmount,
      discountPercent: sub?.discountPercent,
      discountType: sub?.discountType,
      planName: sub?.planName,
      planType: sub?.planType,
      totalAmount: sub?.totalAmount,
      planAmount: sub?.planAmount,
      selectedChallenges: [],
    }));
    setNoOfChallengeAccess(sub?.challengesAccess);
  };

  const onProceed = () => {
    if (
      renewalData?.selectedChallenges?.length < (noOfChallengeAccess || 1) ||
      !renewalData?.modeOfPayment
    ) {
      setErrors({
        modeOfPayment: !renewalData?.modeOfPayment
          ? "Please select mode of payment"
          : "",
        selectedChallenges:
          renewalData?.selectedChallenges?.length < (noOfChallengeAccess || 1)
            ? "Please select the challenges"
            : "",
      });
      return;
    }
    const payLoad = {
      subscriptionId: renewalData?.subscriptionId || subscriptionList?.[0]?._id, ///subscription id
      challenge: renewalData?.selectedChallenges?.map(
        (challenge) => challenge?._id
      ),
      paymentMethod: renewalData?.modeOfPayment,
      ...renewalData,
    };

    if (renewalData?.modeOfPayment === "Offline") {
      services?.purchaseSubscription(payLoad, closeModal);
    } else {
      publishNotification("Online payment  is not yet implemented", "error");
    }
  };

  return (
    <>
      {subscriptionList?.length > 0 &&
        subscriptionList?.map((sub, i) => (
          <SubscriptionCard
            isSubscriptionSelected={selectedSubscriptionId === i}
            radioButton={true}
            isExpiryDate={false}
            amount={sub?.planAmount}
            totalAmount={sub?.totalAmount}
            accessChallenge={sub?.challengesAccess}
            planName={sub?.planName}
            discountPercent={sub?.discountPercent || null}
            discountAmount={sub?.discountAmount || null}
            onClick={() => handleSubscriptionCardClick(i, sub)}
          />
        ))}

      <Field
        className={classes?.label}
        label="Mode Of Payment"
        validationMessage={errors?.modeOfPayment}
        required
      >
        <Combobox
          size="large"
          className="input__Style"
          placeholder="Mode Of Payment"
          onOptionSelect={(e, data) => {
            setRenewalData((p) => ({ ...p, modeOfPayment: data?.optionText }));
            setErrors((p) => ({ ...p, modeOfPayment: "" }));
          }}
          freeform
        >
          {["Online", "Offline"].map((option, key) => (
            <Option key={key}>{option}</Option>
          ))}
        </Combobox>
      </Field>

      <Field
        className={classes?.label}
        label="Challenges"
        required
        validationMessage={errors?.selectedChallenges}
      >
        <Combobox
          size="large"
          className="input__Style"
          placeholder="Select Challenges"
          multiselect
          selectedOptions={renewalData?.selectedChallenges}
          disabled={renewalData?.selectedSubscriptionId === null}
          value={
            renewalData?.selectedChallenges
              ?.map((data) => data?.challengeName)
              ?.join(", ") || ""
          }
          onOptionSelect={(e, data) => {
            if (data?.selectedOptions?.length > noOfChallengeAccess) {
              return publishNotification(
                `Cannot access more challenges or change the subscription`,
                "error"
              );
            }
            setRenewalData((p) => ({
              ...p,
              selectedChallenges: data.selectedOptions,
            }));
            setErrors((p) => ({ ...p, selectedChallenges: "" }));
          }}
        >
          {challengesList?.length > 0 &&
            challengesList.map((option, key) => (
              <Option key={key} value={option}>
                {option.challengeName}
              </Option>
            ))}
        </Combobox>
      </Field>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px",
        }}
      >
        <Button
          className={classes?.renewButton}
          onClick={() => {
            onProceed();
          }}
        >
          Proceed
        </Button>
      </Box>
    </>
  );
}

export default RenewalModalContent;
