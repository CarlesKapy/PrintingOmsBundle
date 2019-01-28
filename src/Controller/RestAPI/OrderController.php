<?php

namespace Tmtfactory\PrintingOmsBundle\Controller\RestAPI;

use League\Tactician\CommandBus;

use FOS\RestBundle\Context\Context;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Rest;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

use Tmtfactory\PrintingOmsBundle\Command\ChangeOrderStatusCommand;
use Tmtfactory\PrintingOmsBundle\Repository\Order\IOrderRepository;

/**
 * Class OrderController
 * @package Tmtfactory\PrintingOmsBundle\Controller\RestAPI
 */
class OrderController extends AbstractFOSRestController
{
    /**
     * @var IOrderRepository
     */
    private $orderRepository;

    /**
     * OrderController constructor.
     * @param IOrderRepository $orderRepository
     */
    public function __construct(IOrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * Get Orders
     *
     * @Rest\QueryParam(
     *     name = "status",
     *     description = "Order's status ids (?status[]=1&status[]=2)",
     *     map = true,
     *     nullable = true
     * )
     *
     * @param array $status
     *
     * @return Response
     */
    public function getOrderAction($status)
    {
        if (is_null($status)) {
            $statuses = $this->orderRepository->getAllStatus();
        } else {

            if (!is_array($status)) {
                throw new \InvalidArgumentException('Status must be informed as an array');
            }

            $statuses = $status;
        }

        $response = [];

        foreach ($statuses as $status) {
            $orders = $this->orderRepository->findByStatus($status);
            $response = array_merge($response, $orders);
        }

        $view = new View($response);

        $serializationGroups = ["default"];
        $context = new Context();
        $context->setGroups($serializationGroups);
        $view->setContext($context);

        return $this->handleView($view);
    }

    /**
     * Put Order Lines
     *
     * @Rest\Route("/order/{orderId}/status/{statusId}")
     *
     * @param integer $orderId
     * @param integer $statusId
     * @param CommandBus $commandBus
     *
     * @return Response
     */
    public function putOrderAction($orderId, $statusId, CommandBus $commandBus)
    {
        if (is_null($orderId)) {
            throw new \InvalidArgumentException('Order Id must be informed');
        }

        $statuses = $this->orderRepository->getAllStatus();
        if (!in_array($statusId, $statuses)) {
            throw new ResourceNotFoundException("Status with id $statusId does not exist");
        }

        $order = $this->orderRepository->findById($orderId);

        $command = new ChangeOrderStatusCommand($order, $statusId);
        $commandBus->handle($command);

        $order = $this->orderRepository->findById($orderId);

        $view = new View($order);
        return $this->handleView($view);
    }
}
