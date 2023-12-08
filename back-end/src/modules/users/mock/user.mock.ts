import { meetingScheduledMock, meetingScheduledMock2, meetingScheduledMock3, meetingScheduledMock4 } from "../../meetings/tests/mock/meeting.mock";
import { User } from "../entity/user.entity";

export const brokerUserMock = new User();
brokerUserMock.idUser = 1;
brokerUserMock.name = "Broker";
brokerUserMock.email = "broker@email.com";
brokerUserMock.password =
  "$2b$12$ahF65Y4ja6qQhz9.9.1lUerpPa8EpXXYQ0lq58y9WlRyN5Wz79q3G";
brokerUserMock.role = "Broker";
brokerUserMock.brokerMeetings = [meetingScheduledMock, meetingScheduledMock3];

export const customerUserMock = new User();
customerUserMock.idUser = 2;
customerUserMock.name = "customer";
customerUserMock.email = "customer@email.com";
customerUserMock.password =
  "$2b$12$D0ylsIPE/.oKgq/plqtNNONAyCub/GEg4Kkiq0aq6AVvEEqg5EMVm";
customerUserMock.role = "Customer";
customerUserMock.customerMeetings = [meetingScheduledMock, meetingScheduledMock4];

export const outerBrokerUserMock = new User();
outerBrokerUserMock.idUser = 3;
outerBrokerUserMock.name = "teste";
outerBrokerUserMock.email = "teste@email.com";
outerBrokerUserMock.password =
  "$2b$12$hbplfAb.KnUTcoiVUQYqzuA.dG9KplOTN97mG6LznMF/3hdhWRuqG";
outerBrokerUserMock.role = "Broker";
outerBrokerUserMock.brokerMeetings = [meetingScheduledMock2, meetingScheduledMock4];

export const outherCustomerUserMock = new User();
outherCustomerUserMock.idUser = 4;
outherCustomerUserMock.name = "Outher";
outherCustomerUserMock.email = "Outher@email.com";
outherCustomerUserMock.password =
  "$2b$12$hbplfAb.KnUTcoiVUQYqzuA.dG9KplOTN97mG6LznMF/3hdhWRuqG";
outherCustomerUserMock.role = "Customer";
outherCustomerUserMock.customerMeetings = [meetingScheduledMock2, meetingScheduledMock3];

export const brokerFreeUserMock = new User();
brokerFreeUserMock.idUser = 5;
brokerFreeUserMock.name = "teste";
brokerFreeUserMock.email = "teste@email.com";
brokerFreeUserMock.password =
  "$2b$12$hbplfAb.KnUTcoiVUQYqzuA.dG9KplOTN97mG6LznMF/3hdhWRuqG";
brokerFreeUserMock.role = "Broker";
brokerFreeUserMock.brokerMeetings = [];

export const customerFreeUserMock = new User();
customerFreeUserMock.idUser = 6;
customerFreeUserMock.name = "teste";
customerFreeUserMock.email = "teste@email.com";
customerFreeUserMock.password =
  "$2b$12$hbplfAb.KnUTcoiVUQYqzuA.dG9KplOTN97mG6LznMF/3hdhWRuqG";
customerFreeUserMock.role = "Customer";
customerFreeUserMock.customerMeetings = [];

